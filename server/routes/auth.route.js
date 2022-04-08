const router = require('express').Router();
const bcrypt = require('bcrypt');
const { isPasswordConfirm, isPasswordValid } = require('../utils/passwordCheck'); //функции проверки валидности пароля
const { isEmailUnique, isValidEmail } = require('../utils/emailCheck'); // функции проверки валидности мыла
const { User, sequelize } = require('../db/models');

const saltRounds = 10;

router.route('/').get(async (req, res) => {
	if (req.session.userId) {
		try {
			const { id, username: name, email: userEmail, avatar_url: avatar } = await User.findOne({
				where: { id: req.session.userId },
				raw: true
			});
			req.session.userId = id;
			req.session.username = name;
			req.session.email = userEmail;
			res.json({ status: 200, user: { id, name, userEmail, avatar } });
		} catch (error) {
			console.error(error);
			res.json({ status: 400, error: 'Что-то пошло не так. Войдите снова.' });
		}
	}
});

router.route('/signup').post(async (req, res) => {
	const { username, email, password, confirmPassword } = req.body;
	const { avatar_url } = req.files;

	if (Object.keys(req.files).length > 0) {
		const avatarPhotoName = avatar_url.name;
		avatar_url.mv(`public/uploads/${email}/${avatarPhotoName}`);
	}

	if (!isValidEmail(email)) {
		res.json({
			status: 400,
			error: 'Некорректный email. Введите электронную почту в формате: "example@example.com"'
		});
	} else if (password.length < 8) {
		res.json({ status: 400, error: 'Пароль должен быть не менее 8 символов' });
	} else if (!isPasswordConfirm(password, confirmPassword)) {
		res.json({ status: 400, error: 'Пароли не совпадают' });
	} else if (await isEmailUnique(email)) {
		try {
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			const avatarUrl = Object.keys(req.files).length !== 0 ? avatar_url.name : '../defaultUser.png';
			const { id, username: name, email: userEmail, avatar_url: avatar } = await User.create({
				username,
				email,
				password: hashedPassword,
				avatar_url: `${email}/${avatarUrl}`
			});
			req.session.userId = id;
			req.session.username = name;
			req.session.email = userEmail;
			res.json({ status: 200, user: { id, name, userEmail, avatar } }); // avatar
		} catch (error) {
			console.error(error);
			res.json({ status: 400, error: 'Что-то пошло не так. Попробуйте позже.' });
		}
	} else {
		res.json({ status: 400, error: 'Пользователь с таким email уже зарегистрирован.' });
	}
});

router.route('/signin').post(async (req, res) => {
	const { email, password } = req.body;
	if (!isValidEmail(email)) {
		res.json({
			status: 400,
			error: 'Некорректный email. Введите электронную почту в формате: "example@example.com"'
		});
	} else {
		try {
			const user = await User.findOne({
				where: { email },
				raw: true
			});
			if (user === null) {
				res.json({ status: 400, error: 'Пользователь с таким email не зарегистрирован' });
			} else if (await isPasswordValid(password, user.password)) {
				const { id, username: name, email: userEmail, avatar_url: avatar } = user;
				req.session.userId = id;
				req.session.username = name;
				req.session.email = userEmail;
				res.json({ status: 200, user: { id, name, userEmail, avatar } });
			} else {
				res.json({ status: 400, error: 'Неверный пароль. Повторите попытку' });
			}
		} catch (error) {
			console.error(error);
			res.json({ status: 400, error: 'Что-то пошло не так. Попробуйте позже.' });
		}
	}
});

router.get('/signout', (req, res) => {
	try {
		req.session.destroy();
		res.clearCookie('sid');
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.json({ status: 400, error: 'Что-то пошло не так. Попробуйте позже.' });
	}
});

router.route('/profile').post(async (req, res) => {
	const { id, username, email } = req.body;
	const { avatar_url } = req.files;

	if (Object.keys(req.files).length > 0) {
		const avatarPhotoName = avatar_url.name;
		avatar_url.mv(`public/uploads/${email}/${avatarPhotoName}`);
	}
	try {
		const avatarUrl = Object.keys(req.files).length !== 0 ? avatar_url.name : '../defaultUser.png';
		const avatarPhotoName = avatar_url.name;
		avatar_url.mv(`public/uploads/${email}/${avatarPhotoName}`);
		await User.update({ username, email, avatar_url: `${email}/${avatarUrl}` }, { where: { id } });
		res.json({ status: 200, user: { id, username, email, avatar_url } });
	} catch (error) {
		res.json({ status: 400, error: 'Что-то пошло не так. Попробуйте позже.' });
	}
});
router.route('/profile/:userId').get(async (req, res) => {
	const { userId } = req.params;

	try {
		const userResults = await sequelize.query(`
    SELECT "Rooms"."createdAt" AS "date", "Rooms"."name" AS "roomName", "Topics"."title" AS "topicTitle",
    COUNT(CASE
      WHEN "is_solved" = true
      THEN 1
      ELSE NULL
      END) AS "correctAnswers",
	  COUNT("is_solved") AS "questionCounter"
    FROM "Rooms"
    INNER JOIN "FinishedQuestions"
    ON "Rooms"."id" = "FinishedQuestions"."room_id"
    INNER JOIN "Topics"
    ON "Topics"."id" = "Rooms"."topic_id"
    AND "FinishedQuestions"."user_id" = ${userId}
    GROUP BY "Rooms"."name", "Rooms"."createdAt", "Topics"."title"
    ORDER BY "Rooms"."createdAt" DESC;`);
		res.json(userResults[0]);
	} catch (error) {
		console.error(error);
		res.json({ status: 400, error: 'Что-то пошло не так. Попробуйте позже.' });
	}
});

module.exports = router;
