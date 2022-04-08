const router = require('express').Router();
const { Room, Topic, Game, UserInRoom, User, QuestionsInput, QuestionsOption } = require('../db/models');
const { sequelize } = require('../db/models');

router
	.route('/create')
	// ручка создания комнаты
	.post(async (req, res) => {
		const { userId, isCreator, roomHash, topicId, gameId, roomName, roomPassword, colOfPlayers, status } = req.body;
		try {
			const { id: roomId, room_hash, name, password, max_players, status: roomStatus } = await Room.create({
				room_hash: roomHash,
				topic_id: topicId,
				game_id: gameId,
				name: roomName,
				password: roomPassword,
				max_players: colOfPlayers,
				status
			});

			const { title: topicTitle } = await Topic.findOne({ where: { id: topicId }, raw: true });
			const { title: gameTitle, img_url: gameImage } = await Game.findOne({ where: { id: gameId }, raw: true });
			const { username: creator } = await User.findOne({ where: { id: userId }, raw: true });

			res.json({
				roomId,
				creator,
				room_hash,
				name,
				isPassword: roomPassword.length > 0 ? true : false,
				max_players,
				roomStatus,
				topicTitle,
				gameTitle,
				gameImage
			});
		} catch (error) {
			console.error(error);
			res.json({ error });
		}
	});

router
	.route('/')
	// ручка инициализации списка доступных комнат
	.get(async (req, res) => {
		try {
			const roomsList = await Room.findAll({
				where: { status: 'waiting' },
				type: sequelize.QueryTypes.SELECT,
				include: [
					{
						model: Game,
						attributes: [ [ 'title', 'gameTitle' ], [ 'img_url', 'gameImg' ] ]
					},
					{
						model: Topic,
						attributes: [ [ 'title', 'topicTitle' ] ]
					},
					{
						model: User,
						through: {
							model: UserInRoom,
							where: { is_creator: true },
							attributes: [ 'is_creator' ]
						},
						attributes: [ 'username' ]
					}
				]
			});
			const correctRooms = roomsList.map((room) => {
				const {
					id: roomId,
					Users: [ { username: creator } ],
					room_hash,
					name,
					password,
					max_players,
					status: roomStatus,
					Topic: { dataValues: { topicTitle } },
					Game: { dataValues: { gameTitle, gameImg: gameImage } }
				} = room;
				return {
					roomId,
					creator,
					room_hash,
					name,
					isPassword: password.length > 0 ? true : false,
					max_players,
					roomStatus,
					topicTitle,
					gameTitle,
					gameImage
				};
			});
			res.json(correctRooms);
		} catch (error) {
			console.error(error);
			res.json({ error });
		}
	});

// ручка проверки пароля комнаты
router.route('/checkpassword').post(async (req, res) => {
	const { roomPass, roomId, roomHash } = req.body;
	try {
		const { password } = await Room.findByPk(roomId);
		if (roomPass === password) {
			res.json({ message: 'good' });
		} else {
			res.json({ error: 'Неверный пароль. Введите снова или уточните у создателя комнаты.' });
		}
	} catch (error) {
		console.error(error);
		res.json({ error });
	}
});

router
	.route('/:roomHash')
	// ручка для инициализации текущий комнаты
	.get(async (req, res) => {
		const { roomHash } = req.params;
		try {
			const currentRoom = await Room.findOne({
				where: { room_hash: roomHash },
				include: [
					{
						model: Game,
						attributes: [ [ 'title', 'gameTitle' ], [ 'img_url', 'gameImg' ] ]
					},
					{
						model: Topic,
						attributes: [ [ 'title', 'topicTitle' ] ]
					},
					{
						model: User,
						through: {
							model: UserInRoom,
							where: { is_creator: true },
							attributes: [ 'is_creator' ]
						},
						attributes: [ 'username' ]
					}
				]
			});
			if (currentRoom === null || currentRoom.status !== 'waiting') {
				res.json({ message: 'Комната не существует или игра завершена. Выбирете другую.' });
			} else {
				if (currentRoom.Users.length > 0) {
					const {
						id: roomId,
						Users: [ { username: creator } ],
						room_hash,
						name,
						password,
						max_players,
						status: roomStatus,
						Topic: { dataValues: { topicTitle } },
						Game: { dataValues: { gameTitle, gameImg: gameImage } }
					} = currentRoom;
					res.json({
						roomId,
						creator,
						room_hash,
						name,
						password,
						max_players,
						roomStatus,
						topicTitle,
						gameTitle,
						gameImage
					});
				} else {
					const {
						id: roomId,
						room_hash,
						name,
						password,
						max_players,
						status: roomStatus,
						Topic: { dataValues: { topicTitle } },
						Game: { dataValues: { gameTitle, gameImg: gameImage } }
					} = currentRoom;
					res.json({
						roomId,
						room_hash,
						name,
						password,
						max_players,
						roomStatus,
						topicTitle,
						gameTitle,
						gameImage
					});
				}
			}
		} catch (error) {
			console.error(error);
			res.json({ error });
		}
	})
	.post(async (req, res) => {
		const { roomId } = req.body;
		const game = await Room.findOne({
			where: { id: roomId },
			raw: true,
			include: [
				{
					model: Game
				}
			]
		});

		const questionsOption = await QuestionsOption.findAll({
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
			where: { game_id: game['Game.id'] },
			raw: true
		});

		const questionsInput = await QuestionsInput.findAll({
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
			where: { game_id: game['Game.id'] },
			raw: true
		});

		const allQuestions = {
			questionsOption,
			questionsInput
		};

		res.json(allQuestions);
	});

module.exports = router;
