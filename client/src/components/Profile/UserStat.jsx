import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './UserStat.scss';

function UserStat({ userStats }) {
	return (
		<React.Fragment>
      <div className="user-stats__wrapper">
        <h2>Результаты по пройденным играм</h2>
        <div className="user-stats">
          <div className="user-stats__headers">
            <div className="user-stats__headers-date">Дата игры</div>
            <div className="user-stats__headers-room-name">Название комнаты</div>
            <div className="user-stats__headers-theme">Тема</div>
            <div className="user-stats__headers-correct-answers">Отвечено верно</div>
            <div className="user-stats__headers-total-questions">Всего вопросов</div>
          </div>
          {userStats?.map((singleGame) => (
            <div className="user-stats__statistic" key={uuidv4()}>
              <div className="user-stats__statistic-date">{singleGame.date.slice(0, 10)}</div>
              <div className="user-stats__statistic-room-name">{singleGame.roomName}</div>
              <div className="user-stats__statistic-theme">{singleGame.topicTitle}</div>
              <div className="user-stats__statistic-correct-answers">{singleGame.correctAnswers}</div>
              <div className="user-stats__statistic-total-questions">{singleGame.questionCounter}</div>
            </div>
          ))}
        </div>
      </div>
		</React.Fragment>
	);
}

export default UserStat;
