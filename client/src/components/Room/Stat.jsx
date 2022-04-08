import React from 'react';
import './stat.scss';

function Stat({stats, finishedQuestions}) {
  const sortedStats = stats.sort((player1, player2) => player2.correctAnswers - player1.correctAnswers);
	return (
    <>
		<div className="stat">
			<h2>Статиcтика</h2>
			<div className="stat__wrapper">

    
        {sortedStats &&
          sortedStats.map((oneUser) => {
            return (
              <div key={oneUser.username} className="stat__user">
                {oneUser && <div className="stat__img"><img width="29" height="29" src={oneUser.avatar_url ? `${process.env.REACT_APP_STATIC_PATH}/${oneUser.avatar_url}` : `${process.env.REACT_APP_STATIC_PATH}/defaultUser.png`} alt="" /></div>}
                <div className="stat__login">{oneUser.username}</div>
                {oneUser.correctAnswers && <div className="stat__score">{oneUser.correctAnswers}/{finishedQuestions}</div>}
              </div>
            )
          })
        }
			</div>
		</div>
    </>
	);
}

export default Stat;
