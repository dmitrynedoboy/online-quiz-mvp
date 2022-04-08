import React, { useState, useEffect, useRef } from 'react';
import InputQuestion from './InputQuestion';
import InputQuestionsList from './InputQuestionsList';
import OptionQuestion from './OptionQuestion';
import OptionQuestionsList from './OptionQuestionsList';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './style.scss';
import Modal from '../Modal/Modal';

function CreateGame() {
	const { user } = useSelector((state) => state);
	const [ topics, setTopics ] = useState([]);
	const [ topicID, setTopicID ] = useState(topics.title);
	const fileInputRef = useRef();
	let topic_id = useRef();
	const [ discription, setDiscription ] = useState([]);
	const [ imageUrl, setImageUrl ] = useState(); // тут объект с картинкой
	const [ title, setTitle ] = useState([]);
	const [ optionQuestions, setOptionQuestions ] = useState([]);
	const [ inputQuestions, setInputQuestions ] = useState([]);
	const [ preview, setPreview ] = useState(''); // тут base64
	const [ isInputOpen, setIsInputOpen ] = useState(false);
	const [ isOptionOpen, setIsOptionOpen ] = useState(false);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		axios(`${process.env.REACT_APP_SERVER_HOST}/topics`).then((response) => {
			setTopics(response.data);
		});
	}, []);

	useEffect(
		() => {
			if (imageUrl) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result);
				};
				reader.readAsDataURL(imageUrl);
			} else {
				setPreview(null);
			}
		},
		[ imageUrl ]
	);

	function submitHandler(event) {
		event.preventDefault();
		const questionsList = {
			topic_id: topicID,
			userId: user.value.id,
			title: title,
			discription: discription,
			url: preview,
			inputQuestions: inputQuestions,
			optionQuestions: optionQuestions
		};

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(questionsList)
		};

		fetch(`${process.env.REACT_APP_SERVER_HOST}/create_game`, options);

		setDiscription([]);
		setImageUrl();
		setTitle('');
		setOptionQuestions([]);
		setInputQuestions([]);
		setPreview('');
		setTopics([]);
	}

	return (
		<React.Fragment>
			{error && <Modal message={error} />}
			<div className="create-game">
				<label className="create-game__label" htmlFor="inputNameGame">
					Название
				</label>
				<input
					required
					className="create-game__input"
					id="inputNameGame"
					type="text"
					name="inputNameGame"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
				<label className="create-game__label" htmlFor="inputDiscriptionGame">
					Описание игры
				</label>
				<input
					required
					className="create-game__input"
					id="inputDiscriptionGame"
					type="text"
					name="inputDiscriptionGame"
					value={discription}
					onChange={({ target }) => setDiscription(target.value)}
				/>
				<label className="create-game__label" htmlFor="selectThemeGame">
					Тема игры
				</label>
				<select
					className="create-game__select"
					onChange={({ target }) => setTopicID(target.value)}
					id="selectThemeGame"
					ref={topic_id}
				>
					<option value="" />
					{topics.map((theme) => {
						return (
							<option key={theme.id} value={theme.id}>
								{theme.title}
							</option>
						);
					})}
				</select>
				{preview ? (
					<div className="create-game__photo-game">
						<label className="create-game__photo-game-label" htmlFor="imageCreateGame">
							Фото
						</label>
						<img src={preview} alt="" width="240" height="320" />
					</div>
				) : (
					''
				)}

				<button
					onClick={(event) => {
						event.preventDefault();
						fileInputRef.current.click();
					}}
					className="create-game__button"
				>
					Добавить фотографию игры
				</button>
				<input
					className="create-game__input"
					id="imageCreateGame"
					type="file"
					name="imageCreateGame"
					ref={fileInputRef}
					style={{ display: 'none' }}
					accept="image/png, image/jpeg, image/jpg"
					onChange={(event) => {
						const file = event.target.files[0];
						if (file.size / 1000 < 50) {
							setImageUrl(file);
						} else {
							setError('Размер файла не может превышать 50 Килобайт (КБ)');
							setImageUrl(null);
						}
					}}
				/>
				<div className="create-game__buttons">
					<button onClick={() => setIsInputOpen(!isInputOpen)} className="create-game__button">
						Свободный вопрос
					</button>
					<button onClick={() => setIsOptionOpen(!isOptionOpen)} className="create-game__button">
						Вопрос с выбором
					</button>
				</div>
				{isInputOpen && (
					<InputQuestion
						setInputQuestions={setInputQuestions}
						inputQuestions={inputQuestions}
						setIsInputOpen={setIsInputOpen}
					/>
				)}
				{isOptionOpen && (
					<OptionQuestion
						setOptionQuestions={setOptionQuestions}
						optionQuestions={optionQuestions}
						setIsOptionOpen={setIsOptionOpen}
					/>
				)}

				<InputQuestionsList inputQuestions={inputQuestions} />
				<OptionQuestionsList optionQuestions={optionQuestions} />

				<button onClick={submitHandler} className="create-game__button-main">
					Создать игру
				</button>
			</div>
		</React.Fragment>
	);
}

export default CreateGame;
