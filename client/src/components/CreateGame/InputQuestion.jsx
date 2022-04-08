import React, { useState, useRef, useEffect } from 'react';
import Modal from '../Modal/Modal';

function InputQuestion({ setIsInputOpen, setInputQuestions, inputQuestions }) {
	const [ inputQuestion, setInputQuestion ] = useState('');
	const [ inputAnswer, setInputAnswer ] = useState('');
	const [ inputTypePhoto, setInputTypePhoto ] = useState();
	const [ preview, setPreview ] = useState('');
	const [ error, setError ] = useState(false);

	const fileInputRef = useRef();

	function submitHandler() {
		const currentObj = {
			type: 'input',
			question: inputQuestion,
			answer: inputAnswer,
			photo: preview
		};
		setInputQuestions([ ...inputQuestions, currentObj ]);
		setInputQuestion('');
		setInputAnswer('');
		setInputTypePhoto();
		setIsInputOpen(false);
	}

	useEffect(
		() => {
			if (inputTypePhoto) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result);
				};
				reader.readAsDataURL(inputTypePhoto);
			} else {
				setPreview(null);
			}
		},
		[ inputTypePhoto ]
	);
	return (
		<div className="create-game__input-type">
			{error && <Modal message={error} />}
			<div className="create-game__input-type-question">
				<label className="create-game__input-type-question-label" htmlFor="inputQuestion">
					Введите вопрос
				</label>
				<input
					required
					className="create-game__input-type-question-input"
					id="optionQuestion"
					type="text"
					name="optionQuestion"
					value={inputQuestion}
					onChange={({ target }) => setInputQuestion(target.value)}
				/>
			</div>
			<div className="create-game__input-type-answer">
				<label className="create-game__input-type-answer-label" htmlFor="inputAnswer">
					Правильный ответ
				</label>
				<input
					required
					className="create-game__input-type-answer-input"
					id="optionAnswer"
					type="text"
					name="optionAnswer"
					value={inputAnswer}
					onChange={({ target }) => setInputAnswer(target.value)}
				/>
			</div>
			<div className="create-game__input-type-photo">
				{preview ? (
					<div className="create-game__input-type-photo-wrapper">
						<label className="create-game__input-type-photo-label" htmlFor="imageCreateGame">
							Фото
						</label>{' '}
						<img src={preview} alt="" />{' '}
					</div>
				) : (
					''
				)}

				<button
					onClick={(event) => {
						event.preventDefault();
						fileInputRef.current.click();
					}}
					className="create-game__input-type-photo-button"
				>
					Добавить фотку к вопросу
				</button>

				<input
					className="create-game__input-type-input"
					id="imageCreateGame"
					type="file"
					name="imageCreateGame"
					ref={fileInputRef}
					style={{ display: 'none' }}
					accept="image/png, image/jpeg, image/jpg"
					onChange={(event) => {
						const file = event.target.files[0];
						if (file.size / 1000 < 50) {
							setInputTypePhoto(file);
						} else {
							setError('Размер файла не может превышать 50 Килобайт (КБ)');
							setInputTypePhoto(null);
						}
					}}
				/>
			</div>
			<div className="create-game__input-type-button">
				<button onClick={submitHandler}>Добавить вопрос</button>
			</div>
		</div>
	);
}

export default InputQuestion;
