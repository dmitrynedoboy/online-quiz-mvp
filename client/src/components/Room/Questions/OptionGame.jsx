import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './optionGame.scss'

function OptionGame({currentQuestion, sendAnswer, timerTime, userAnswers}) {
  const currentOptions = [currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4];
  const { room, user: {value:user} } = useSelector(state => state);
  const [timer, setTimer] = useState(timerTime);
  const [answer, setAnswer] = useState('');

  useEffect(() => {

    let timeout = setTimeout(() => {
      setTimer((prev) => prev - 1)
    }, 1000);

    if (timer <= 0) {
      sendAnswer({ roomHash: room.room_hash, userId: user.id, roomId: room.id, userAnswer: answer, questionId:currentQuestion.id, questionType:'option'});
      setAnswer('');
      setTimer(timerTime);
      return () => {
         clearTimeout(timeout)
        }
    }

  }, [timer]);

  return (
    <div className="option-game">
      <div className="option-game__question-title">Вопрос:</div>
      <div className="option-game__question">{currentQuestion.question}</div>
      <div className="option-game__image">
        {currentQuestion.img!== null &&
				  (<img src={`${process.env.REACT_APP_STATIC_PATH}/${currentQuestion.img}.png`} alt="img"/>)
        }
      </div>
      <div className="option-game__question-title">Выберите правильный ответ:</div>
      <div className="radio">
        {
          currentOptions?.map((option, index) => {
             return ( <div className="radio__btn" key={option}>
                <input onChange={({target}) => {setAnswer(target.value)}} id={`radio-${index}`} type="radio" name="radio" value={option}/>
                <label htmlFor={`radio-${index}`}>{option}</label>
              </div>
             );
          })
        }
      </div>
      <div className="option-game__timer"> <span className="option-game__timer-title">Оставшееся время:</span> <span className="option-game__timer-time">{timer} секунд</span></div>
    </div>
  );
}

export default OptionGame;
