import React from 'react';
import InputGame from './Questions/InputGame';
import OptionGame from './Questions/OptionGame';
import Stat from '../Room/Stat';
import './GameStyle.scss';

function Game({ currentQuestion, sendAnswer, finishedQuestions, stats, userAnswers }) {
	const timerTime = 10;
	return (
		<div className="game">
			<div className="game__container">
				<h1>Идет игра</h1>
				<div className="game__game-container">
					<div className="game__stat">
						<Stat stats={stats} finishedQuestions={finishedQuestions} />
					</div>
					<div className="game__questions">
						{currentQuestion.option1 ? (
							<OptionGame
								currentQuestion={currentQuestion}
								timerTime={timerTime}
								userAnswers={userAnswers}
								sendAnswer={sendAnswer}
							/>
						) : (
							<InputGame
								currentQuestion={currentQuestion}
								timerTime={timerTime}
								userAnswers={userAnswers}
								sendAnswer={sendAnswer}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Game;
