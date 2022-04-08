import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal/Modal';

function OptionQuestion({ setIsOptionOpen, setOptionQuestions, optionQuestions }) {
	const [ inputQuestion, setInputQuestion ] = useState('');
	const [ inputAnswer, setInputAnswer ] = useState('');
	const [ optionOne, setOptionOne ] = useState('');
	const [ optionTwo, setOptionTwo ] = useState('');
	const [ optionThree, setOptionThree ] = useState('');
	const [ optionFour, setOptionFour ] = useState('');
	const [ optionTypePhoto, setOptionTypePhoto ] = useState();
	const [ preview, setPreview ] = useState('');
	const [ error, setError ] = useState(false);
	const fileInputRef = useRef();

	useEffect(
		() => {
			if (optionTypePhoto) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result);
				};
				reader.readAsDataURL(optionTypePhoto);
			} else {
				setPreview(null);
			}
		},
		[ optionTypePhoto ]
	);

	function submitHandler() {
		const currentObj = {
			type: 'option',
			question: inputQuestion,
			answer: inputAnswer,
			option1: optionOne,
			option2: optionTwo,
			option3: optionThree,
			option4: optionFour,
			photo: preview
		};
		setOptionQuestions([ ...optionQuestions, currentObj ]);
		setInputQuestion('');
		setInputAnswer('');
		setOptionOne('');
		setOptionTwo('');
		setOptionThree('');
		setOptionFour('');
		setOptionTypePhoto();
		setIsOptionOpen(false);
	}

	return (
		<div className="create-game__option-type">
			{error && <Modal message={error} />}

			<div className="create-game__option-type-question">
				<label className="create-game__option-type-question-label" htmlFor="optionQuestion">
					Введите вопрос
				</label>
				<input
					required
					className="create-game__option-type-question-input"
					id="inputQuestion"
					type="text"
					name="inputQuestion"
					value={inputQuestion}
					onChange={({ target }) => setInputQuestion(target.value)}
				/>
			</div>
			<div className="create-game__option-type-answer">
				<label className="create-game__option-type-answer-label" htmlFor="optionAnswer">
					Правильный ответ
				</label>
				<input
					required
					className="create-game__option-type-answer-input"
					id="inputAnswer"
					type="text"
					name="inputAnswer"
					value={inputAnswer}
					onChange={({ target }) => setInputAnswer(target.value)}
				/>
			</div>
			<div className="create-game__option-type-option-one">
				<label className="create-game__option-type-option-one-label" htmlFor="optinAnswerOne">
					Вариант 1
				</label>
				<input
					required
					className="create-game__option-type-option-one-input"
					id="inputAnswerOne"
					type="text"
					name="inputAnswerOne"
					value={optionOne}
					onChange={({ target }) => setOptionOne(target.value)}
				/>
			</div>
			<div className="create-game__option-type-option-two">
				<label className="create-game__option-type-option-two-label" htmlFor="optionAnswerTwo">
					Вариант 2
				</label>
				<input
					required
					className="create-game__option-type-option-two-input"
					id="inputAnswerTwo"
					type="text"
					name="inputAnswerTwo"
					value={optionTwo}
					onChange={({ target }) => setOptionTwo(target.value)}
				/>
			</div>
			<div className="create-game__option-type-option-three">
				<label className="create-game__option-type-option-three-label" htmlFor="optionAnswerThree">
					Вариант 3
				</label>
				<input
					required
					className="create-game__option-type-option-three-input"
					id="inputAnswerThree"
					type="text"
					name="inputAnswerThree"
					value={optionThree}
					onChange={({ target }) => setOptionThree(target.value)}
				/>
			</div>
			<div className="create-game__option-type-option-four">
				<label className="create-game__option-type-option-four-label" htmlFor="optionAnswerFour">
					Вариант 4
				</label>
				<input
					required
					className="create-game__option-type-option-four-input"
					id="inputAnswerFour"
					type="text"
					name="inputAnswerFour"
					value={optionFour}
					onChange={({ target }) => setOptionFour(target.value)}
				/>
			</div>
			<div className="create-game__option-type-photo">
				{preview ? (
					<div className="create-game__option-type-photo-wrapper">
						<label className="create-game__option-type-photo-label" htmlFor="imageCreateGame">
							Фото
						</label>

						<img src={preview} alt="" />
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
					Добавить фотку к вопросу
				</button>

				<input
					className="create-game__option-type-photo-input"
					id="imageCreateGame"
					type="file"
					name="imageCreateGame"
					ref={fileInputRef}
					style={{ display: 'none' }}
					accept="image/png, image/jpeg, image/jpg"
					onChange={(event) => {
						const file = event.target.files[0];
						if (file.size / 1000 < 50) {
							setOptionTypePhoto(file);
						} else {
							setError('Размер файла не может превышать 50 Килобайт (КБ)');
							setOptionTypePhoto(null);
						}
					}}
				/>
			</div>
			<div className="create-game__option-type-button">
				<button onClick={submitHandler}>Добавить</button>
			</div>
		</div>
	);
}

export default OptionQuestion;
