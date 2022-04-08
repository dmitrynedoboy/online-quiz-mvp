// подключаем модули
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const { Server: SocketIOServer } = require('socket.io');
const fileUpload = require('express-fileupload');
const { QuestionsInput, QuestionsOption, Game, Room, FinishedQuestion } = require('./db/models');
const { shuffle } = require('./utils/shuffleArray');

// подключаем функции для сокетов
const {
	addUserInRoom,
	getMaxUsers,
	allUsersInRoom,
	userLeavesRoomWaiting,
	getUsersInRoomSocket,
	getRoomStats
} = require('./utils/roomFuncs');

// подключаем роутеры
const authRouter = require('./routes/auth.route');
const createGameRouter = require('./routes/createGame.route');
const topicsRouter = require('./routes/topics.route');
const roomsRouter = require('./routes/rooms.route');
const globalStatRouter = require('./routes/globalStat.route');

const app = express();
const PORT = 4000;

app.use(
	fileUpload({
		createParentPath: true,
		parseNested: true
	})
);

const sessionConfig = {
	store: new FileStore(),
	key: 'sid',
	secret: 'VeRy-SeCReT-KeY',
	resave: false,
	saveUninitialized: false,
	httpOnly: true,
	cookie: { expires: 24 * 60 * 60e3 }
};

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		methods: [ 'GET', 'POST' ]
	}
});

// МИДЛВАРЫ
app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(session(sessionConfig));
app.use(cookieParser());

app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:3001',
			'http://localhost:3000',
			'http://localhost:3002',
		]
	})
);

app.use(express.static(path.join(__dirname, 'public')));

// мидлвары на роутинг
app.use('/auth', authRouter);
app.use('/topics', topicsRouter);
app.use('/create_game', createGameRouter);
app.use('/room', roomsRouter);
app.use('/global_stat', globalStatRouter);

app.use((req, res, next) => {
	if (req.session) {
		res.locals.userId = req.session.userId;
		res.locals.username = req.session.username;
		res.locals.email = req.session.email;
	}
	next();
});

//SOCKETS
let socketStore = {};

io.on('connection', (socket) => {
	// обработчик отключения юзера из комнаты
	socket.on('disconnect', async () => {
		const currentUsers = await userLeavesRoomWaiting(socket.id);
		if (currentUsers === null) {
			io.to(socket.id).emit('roomUndefined');
		} else {
			const { roomHash, usersInRoom } = currentUsers;
			if (usersInRoom && usersInRoom.length === 0) {
				io.to(roomHash).emit('closeRoom');
			}
			socketStore[roomHash].users = usersInRoom;
			io.to(roomHash).emit('currentUsers', usersInRoom);
		}
	});

	// обработчик присоединения юзера к комнате
	socket.on('join', async ({ roomHash, userId, roomId, isCreator }) => {
		const userInSocketRoom = getUsersInRoomSocket(io, roomHash);
		const maxUsersInRoom = await getMaxUsers(roomId);
		if (userInSocketRoom < maxUsersInRoom) {
			socket.join(roomHash);

			const usersInRoom = await addUserInRoom(userId, roomId, isCreator, socket.id);
			socketStore[roomHash] = {};
			socketStore[roomHash].users = usersInRoom;

			io.to(roomHash).emit('currentUsers', usersInRoom);
		} else {
			io.to(socket.id).emit('roomIsFull');
		}
	});

	// сокет запуска игры и получения всех вопросов из базы
	socket.on('game', async ({ roomHash, roomId, isCreator }) => {
		socket.join(roomHash);

		// запрашиваем текущую игру из бызы
		try {
			const game = await Room.findOne({
				where: { id: roomId },
				raw: true,
				include: [
					{
						model: Game
					}
				]
			});

			const roomStatus = await Room.update({ status: 'playing' }, { where: { id: roomId } });
			const newRoom = await Room.findOne({ where: { id: roomId } });

			const questionsOption = await QuestionsOption.findAll({
				attributes: { exclude: [ 'createdAt', 'updatedAt', 'answer' ] },
				where: { game_id: game['Game.id'] },
				raw: true
			});

			const questionsInput = await QuestionsInput.findAll({
				attributes: { exclude: [ 'createdAt', 'updatedAt', 'answer' ] },
				where: { game_id: game['Game.id'] },
				raw: true
			});

			const allQuestionsRaw = [ ...questionsOption, ...questionsInput ];

			const allQuestions = shuffle(allQuestionsRaw);

			socketStore[roomHash] = {
				...socketStore[roomHash],
				counter: 0,
				stats: {},
				allQuestions,
				userAnswers: [],
				answerCounter: 0,
				answerCounterForStatistic: 0
			};

			io.to(roomHash).emit('startGame', {
				status: 'playing',
				currentQuestion: socketStore[roomHash].allQuestions[socketStore[roomHash].counter],
				newRoom
			});
		} catch (error) {
			console.error(error);
		}
	});

	// получаем ответы и отправляем следующий вопрос
	socket.on('answer', async ({ roomHash, userId, roomId, userAnswer, questionId, questionType }) => {
		let currQA;
		try {
			// проверка типа вопроса и получение соответствующих данных из БД
			if (questionType === 'input') {
				currQA = await QuestionsInput.findOne({ where: { id: questionId }, raw: true });
			} else {
				currQA = await QuestionsOption.findOne({ where: { id: questionId }, raw: true });
			}

			// проверка	корректности ответа пользователя и запись ответа в базу данных
			if (userAnswer.toLowerCase() === currQA.answer.toLowerCase()) {
				await FinishedQuestion.create({ room_id: roomId, user_id: userId, is_solved: true });
				socketStore[roomHash].userAnswers.push({ userId, isSolved: true, correctAnswer: currQA.answer });
				socketStore[roomHash].answerCounter += 1;
			} else {
				await FinishedQuestion.create({ room_id: roomId, user_id: userId, is_solved: false });
				socketStore[roomHash].userAnswers.push({ userId, isSolved: false, correctAnswer: currQA.answer });
				socketStore[roomHash].answerCounter += 1;
			}

			// проверка получения всех ответов
			if (socketStore[roomHash].answerCounter === getUsersInRoomSocket(io, roomHash)) {
				socketStore[roomHash].answerCounterForStatistic = socketStore[roomHash].answerCounter;
				socketStore[roomHash].answerCounter = 0;
				socketStore[roomHash].counter += 1;

				// проверка последний вопрос или нет
				if (socketStore[roomHash].counter < socketStore[roomHash].allQuestions.length) {
					const stats = await getRoomStats(roomId);

					// отправляем следующий вопрос и статистику на клиент
					if (socketStore[roomHash].userAnswers.length === socketStore[roomHash].answerCounterForStatistic) {
						io.to(roomHash).emit('nextQuestion', {
							currentQuestion: socketStore[roomHash].allQuestions[socketStore[roomHash].counter],
							userAnswers: socketStore[roomHash].userAnswers,
							stats,
							finishedQuestions: socketStore[roomHash].counter
						});
						socketStore[roomHash].userAnswers = [];
					}
				} else {
					// инициализируем окончание игры
					try {
						const stats = await getRoomStats(roomId);
						await Room.update({ status: 'finished' }, { where: { id: roomId } });
						io.to(roomHash).emit('finishGame', {
							stats,
							finishedQuestions: socketStore[roomHash].counter,
							userAnswers: socketStore[roomHash].userAnswers
						});
					} catch (error) {
						console.error(error);
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	});
});

httpServer.listen(PORT, () => {
	console.log(`Серевер полетел на порту ${PORT}`);
});

app.all('*', (req, res) => {
	res.status(404).redirect('404');
});

module.exports = io;
