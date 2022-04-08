import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './inputGame.scss';

function InputGame({ currentQuestion, sendAnswer, timerTime, userAnswers }) {
	const { room, user: { value: user } } = useSelector((state) => state);
	const [ timer, setTimer ] = useState(timerTime);
	const [ answer, setAnswer ] = useState('');

	useEffect(
		() => {
			let timeout = setTimeout(() => {
				setTimer((prev) => prev - 1);
			}, 1000);

			if (timer <= 0) {
				sendAnswer({
					roomHash: room.room_hash,
					userId: user.id,
					roomId: room.id,
					userAnswer: answer,
					questionId: currentQuestion.id,
					questionType: 'input'
				});
				setAnswer('');
				setTimer(timerTime);
				return () => {
					clearTimeout(timeout);
				};
			}
		},
		[ timer ]
	);

	return (
		<div className="input-game">
			<div className="input-game__question-title">Вопрос:</div>
			<div className="input-game__question">{currentQuestion.question}</div>
			<div className="input-game__image">
				{currentQuestion.img !== null && (
					<img src={`${process.env.REACT_APP_STATIC_PATH}/${currentQuestion.img}.png`} alt="img" />
				)}
			</div>
			<div className="input-game__question-title">Введите ответ:</div>
			<div className="input-game__answer-area">
				<input
					className="input-game__answer"
					type="text"
					value={answer}
					onChange={({ target }) => setAnswer(target.value)}
				/>
				<div className="input-game__timer">
					 <span className="input-game__timer-title">Оставшееся время:</span>{' '}
					<span className="input-game__timer-time">{timer} секунд</span>
				</div>
			</div>
		</div>
	);
}

export default InputGame;
