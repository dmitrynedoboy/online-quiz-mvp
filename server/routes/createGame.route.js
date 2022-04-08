const router = require('express').Router();
const { QuestionsInput, QuestionsOption, Game } = require('../db/models');
const fs = require('fs');
const randomstring = require('randomstring');

router.post('/', async (req, res) => {
	const gameOBJ = req.body;
	let gameCreate;
	try {
    let titleImage = null;
    if (gameOBJ.url){
		const base64Url = gameOBJ.url.replace(/^data:image\/jpeg;base64,/, '');
		 titleImage = randomstring.generate(7);
		fs.writeFile(`public/uploads/${titleImage}.png`, base64Url, 'base64', function(err) {
			console.error(err);
		});
    }

		gameCreate = await Game.create({
			topic_id: gameOBJ.topic_id,
			user_id: gameOBJ.userId,
			title: gameOBJ.title,
			description: gameOBJ.discription,
			img_url: titleImage
		});
    console.log("Крашиться",gameCreate);
	} catch (err) {
		console.error(err);
	}

	const { inputQuestions } = gameOBJ; //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ база QuestionsInputs
	const { optionQuestions } = gameOBJ; //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ база QuestionsOptions

	let options;
	let inputs;

	try {
		optionQuestions.forEach(async (el) => {
			let titleImage;
			if (el.photo) {
				const base64Url = el.photo.replace(/^data:image\/jpeg;base64,/, '');
				titleImage = randomstring.generate(7);
				fs.writeFile(`public/uploads/${titleImage}.png`, base64Url, 'base64', function(err) {
					console.error(err);
				});
			} else {
				titleImage = null;
			}

			options = await QuestionsOption.create({
				game_id: gameCreate.id,
				question: el.question,
				answer: el.answer,
				option1: el.option1,
				option2: el.option2,
				option3: el.option3,
				option4: el.option4,
				img: titleImage
			});
		});
	} catch (err) {
		console.error(err);
	}

	try {
		inputQuestions.forEach(async (el) => {
			let titleImage;
			if (el.photo) {
				const base64Url = el.photo.replace(/^data:image\/jpeg;base64,/, '');
				titleImage = randomstring.generate(7);
				fs.writeFile(`public/uploads/${titleImage}.png`, base64Url, 'base64', function(err) {
					console.error(err);
				});
			} else {
				titleImage = null;
			}

			inputs = await QuestionsInput.create({
				game_id: gameCreate.id,
				question: el.question,
				answer: el.answer,
				img: titleImage
			});
		});
	} catch (err) {
		console.error(err);
	}

	res.status(200);
});

module.exports = router;
