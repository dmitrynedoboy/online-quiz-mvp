import React from 'react';
import './finalStats.scss';


function FinalStats({stats, finishedQuestions}) {

  const sortedStats = stats.sort((player1, player2) => player2.correctAnswers - player1.correctAnswers);
	
  return (
		<div className="final-stats">
      <h1>Игра завершена!</h1>
			<div className="final-stats__wrapper">
        {
          sortedStats &&
          sortedStats.map((oneUser,index) => {
            let currentWinnerClass = '';
            switch (index) {
              case 0:
                currentWinnerClass = 'final-stats__player-first';
                break;
              case 1:
                currentWinnerClass = 'final-stats__player-second';
                break;
              case 2:
                currentWinnerClass = 'final-stats__player-third';
                break;
              default:
                currentWinnerClass =  '';
                break;
            }
            return (
              <div className={`final-stats__players ${currentWinnerClass}`} key={oneUser.id}>
                <div className="final-stats__players-number">
                  <h3>{index + 1}</h3>
                </div>

                <div className="final-stats__player-image">
                  <img width="30" height="30" src={`${process.env.REACT_APP_STATIC_PATH}/${oneUser.avatar_url}`} alt={oneUser.username}/>
                </div>
                <div className="final-stats__players-name">
                  <h3>{oneUser.username}</h3>
                </div>
                <div className="final-stats__players-score">
                  <h3>{oneUser.correctAnswers?oneUser.correctAnswers:0}/{finishedQuestions}</h3>
                </div>
              </div>
            )
          })
        }
				
			</div>
		</div>
	);
}

export default FinalStats;
