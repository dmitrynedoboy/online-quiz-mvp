import io from 'socket.io-client';
import { changeRoomStatusAC, changeRoomStatusToFinished } from '../redux/actions/room.actions';

let socket;
export let currentRoom = [];

// инициализация сокет-соединия
export const initiateSocket = ({
	roomHash,
	userId,
	roomId,
	isCreator,
	setCurrentUsers,
	setCurrentQuestion,
	setSocketRoom,
	dispatch,
	setFullRoom,
	setFinishedQuestions,
	setStats,
	setUserAnswers,
	room
}) => {
	socket = io(process.env.REACT_APP_SERVER_HOST);
	if (socket && roomHash && userId && roomId) socket.emit('join', { roomHash, userId, roomId, isCreator });

	// установка текущего числа пользователей в комнате
	socket.on('currentUsers', (currentUsers) => {
		setCurrentUsers(currentUsers);
		if (currentUsers.length === room['max_players']) {
			setFullRoom(true);
		} else {
			setFullRoom(false);
		}
	});

	// начало игры (вопрос/ответ)
	socket.on('startGame', ({ status, currentQuestion, newRoom }) => {
		dispatch(changeRoomStatusAC(newRoom));
		setCurrentQuestion(currentQuestion);
	});

	// получение результата и следующего вопроса
	socket.on('nextQuestion', ({ currentQuestion, stats, finishedQuestions, userAnswers }) => {
		setUserAnswers(userAnswers);
		setCurrentQuestion(currentQuestion);
		setStats(stats);
		setFinishedQuestions(finishedQuestions);
	});

	// конец игры
	socket.on('finishGame', ({ stats, finishedQuestions, userAnswers }) => {
		dispatch(changeRoomStatusToFinished());
		setStats(stats);
		setFinishedQuestions(finishedQuestions);
	});

	// создатель покинул комнату
	socket.on('closeRoom', () => {
		window.location = '/?message=Создатель комнаты покинул игру. Выберите другую.';
	});

	// комната заполнена - новые игроки перебрасываются на главную
	socket.on('roomIsFull', () => {
		window.location = '/?message=Комната заполнена. Выберите другую.';
	});

	// комната не найдена - переброс на главную
	socket.on('roomUndefined', () => {
		window.location = '/?message=Комната не найдена';
	});
};

export const startGameSocket = ({ gameStart, roomId, roomHash }) => {
	socket.emit('game', { roomId, roomHash });
};

export const sendAnswer = ({ roomHash, userId, roomId, userAnswer, questionId, questionType }) => {
	socket.emit('answer', { roomHash, userId, roomId, userAnswer, questionId, questionType });
};

// функция отключения сокета
export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
	}
};
