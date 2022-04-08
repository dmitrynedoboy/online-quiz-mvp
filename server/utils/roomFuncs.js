const { Room, UserInRoom, User, FinishedQuestion, sequelize } = require('../db/models');

// функция записи вошедшего юзера в базу (UserInName) - возвращает оставшихся юзеров в комнате(массив объектов)
async function addUserInRoom(userId, roomId, isCreator, socketId) {
	try {
		const addedUser = await UserInRoom.create({
			user_id: userId,
			room_id: roomId,
			is_creator: isCreator,
			socket_id: socketId
		});
		return await allUsersInRoom(roomId);
	} catch (error) {
		console.error(error);
		return error;
	}
}

// функция вывода всех юзеров в комнате - возвращает юзеров в комнате(массив объектов)
const allUsersInRoom = async (roomId) => {
	try {
		const rawUsersInRoom = await UserInRoom.findAll({
			raw: true,
			attributes: [ 'room_id' ],
			include: [
				{
					model: Room,
					where: {
						id: roomId
					},
					attributes: []
				},
				{
					model: User,
					attributes: [ 'username', 'email', 'avatar_url', 'id' ]
				}
			]
		});
		const usersInRoom = rawUsersInRoom.map((user) => {
			const {
				room_id: roomId,
				['User.username']: username,
				['User.email']: email,
				['User.avatar_url']: avatarUrl,
				['User.id']: userId
			} = user;
			return { roomId, username, email, avatarUrl, userId };
		});
		return usersInRoom;
	} catch (error) {
		console.error(error);
		return error;
	}
};

// функция удаления юзера из комнаты во время ожидания - возвращает количество удалённых строк
const userLeavesRoomWaiting = async (socketId) => {
	try {
		const usersInRoom = await UserInRoom.findOne({
			where: { socket_id: socketId },
			include: {
				model: Room,
				attributes: [ 'room_hash', 'status' ]
			}
		});
		if (usersInRoom === null) {
			return usersInRoom;
		} else {
			const { is_creator, room_id, user_id, Room: { dataValues: { room_hash: roomHash, status } } } = usersInRoom;
			if (status === 'waiting') {
				if (is_creator) {
					const deleteWholeRoom = await Room.destroy({ where: { id: room_id } });
					return { roomHash, usersInRoom: await allUsersInRoom(room_id) };
				} else {
					const deleteSingleUser = await UserInRoom.destroy({ where: { user_id, room_id } });
					return { roomHash, usersInRoom: await allUsersInRoom(room_id) };
				}
			} else {
				const deleteSingleUser = await UserInRoom.destroy({ where: { user_id, room_id } });
				return { roomHash, usersInRoom: await allUsersInRoom(room_id) };
			}
		}
	} catch (error) {
		console.error(error);
		return error;
	}
};

// функция получения количества юзеров в комнате (socket)
const getUsersInRoomSocket = (io, roomHash) => {
	if (io.sockets.adapter.rooms.get(roomHash)) {
		return io.sockets.adapter.rooms.get(roomHash).size;
	} else return 0;
};

// функция получения максимального количества игроков в комнате
const getMaxUsers = async (roomId) => {
	try {
		const { max_players } = await Room.findOne({ where: { id: roomId } });
		return max_players;
	} catch (error) {
		console.error(error);
		return error;
	}
};

// функция получения текущей статистике по комнате
const getRoomStats = async (roomId) => {
	try {
		const roomStats = await sequelize.query(`
      SELECT "User"."id", "User"."username", "User"."avatar_url",
      COUNT("is_solved") AS "correctAnswers"
      FROM "Users" AS "User"
      INNER JOIN "FinishedQuestions" AS "FinishedQuestions"
      ON "User"."id" = "FinishedQuestions"."user_id"
      AND "FinishedQuestions"."room_id" = ${roomId}
      AND "FinishedQuestions"."is_solved" = true
      GROUP BY "User"."id";`);
		return roomStats[0];
	} catch (error) {
		console.error(error);
		return error;
	}
};

module.exports = {
	getMaxUsers,
	addUserInRoom,
	allUsersInRoom,
	userLeavesRoomWaiting,
	getUsersInRoomSocket,
	getRoomStats
};
