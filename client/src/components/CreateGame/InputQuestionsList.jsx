import React from 'react';
import axios from 'axios';

function InputQuestionsList({ inputQuestions }) {
	return (
		<div className="input-questions-list">
			{inputQuestions.map((question) => (
				<div key={question.question} className="input-questions-list__wrapper">
					<div className="input-questions-list__question-lable">Вопрос:</div>{' '}
					<input type="hidden" name="question" value={question.question} />
					<div className="input-questions-list__question">{question.question}</div>{' '}
					<div className="input-questions-list__answer-label">Ответ:</div>{' '}
					<input type="hidden" name="answer" value={question.answer} />
					<div className="input-questions-list__answer">{question.answer}</div>
					<div className="input-questions-list__photo-label">Фото:</div>{' '}
					<input type="hidden" name="photo" value={question.photo} />
					<img src={question.photo} alt="" />
				</div>
			))}
		</div>
	);
}

export default InputQuestionsList;
