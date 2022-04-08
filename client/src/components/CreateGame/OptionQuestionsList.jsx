import React from 'react';

function OptionQuestionsList({ optionQuestions }) {
	return (
		<div className="option-questions-list">
			{optionQuestions.map((question) => (
				<div key={question.question} className="option-questions-list-wrapper">
					<div className="option-questions-list__question-label">Вопрос</div>
					<div className="option-questions-list__question">{question.question}</div>
					<div className="option-questions-list__answer-label">Ответ</div>
					<div className="option-questions-list__answer">{question.answer}</div>
					<div className="option-questions-list__option-one-label">Первый вариант</div>
					<div className="option-questions-list__option-one">{question.option1}</div>
					<div className="option-questions-list__option-two-label">Второй вариант</div>
					<div className="option-questions-list__option-two">{question.option2}</div>
					<div className="option-questions-list__option-three-label">Третий вариант</div>
					<div className="option-questions-list__option-three">{question.option3}</div>
					<div className="option-questions-list__option-four-label">Четвертый вариант</div>
					<div className="option-questions-list__option-four">{question.option4}</div>
					<div className="option-questions-list__option-foto">Фото</div>
					<img src={question.photo} alt="" />

					<label />
				</div>
			))}
		</div>
	);
}
export default OptionQuestionsList;
