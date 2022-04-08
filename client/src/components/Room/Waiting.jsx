import React from 'react';
import { disconnectSocket } from '../../sockets/sockets.init';
import { useNavigate } from 'react-router-dom';
import './waitingstyles.scss'


function Waiting(props) {
  const {
    room,
    currentUsers,
    isCreator,
    gameStartClick,
    fullRoom
  } = props;

  const navigate = useNavigate();
  function handleClick() {
    disconnectSocket()
    navigate('/')
  }

  return (
    <>
    <h1>Комната ожидания</h1>
      <div className="waiting-room">
        <div onClick={handleClick}className="cl-btn-2 waiting-room__close-button">
            <div>
                <div className="leftright"></div>
                <div className="rightleft"></div>
                <span className="close-btn">Выйти</span>
            </div>
        </div>
        <div className="waiting-room__game-pretitle">Тема игры:</div>
        <div className="waiting-room__title">{room.topicTitle}</div>

        <div className="waiting-room__game-pretitle">Название игры:</div>
        <div className="waiting-room__title">{room.gameTitle}</div>

        <div className="waiting-room__game-pretitle">Создатель комнаты:</div>
        <div className="waiting-room__title">{room.creator}</div>

        <div className="waiting-room__number-of-players">Игроки: <span className="waiting-room__number-of-players-current">{currentUsers?currentUsers.length:0}/{room['max_players']}</span></div>
        <div className="waiting-room__players">
          {currentUsers?.map((user) => (
            <div className="waiting-room__player" key={user.userId}>
              <img className="waiting-room__player-image" width="29" height="29" src={user.avatarUrl?`${process.env.REACT_APP_STATIC_PATH}/${user.avatarUrl}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScdHD-KQQkMQdJcXTSALcRVFp7chjRbA0e-w&usqp=CAU"} alt={user.username} />
              <p>{user.username}</p>
            </div>
          ))}
        </div>
          {
          isCreator && fullRoom && <div>Все на месте. Готовы начать?</div>}
          {
            isCreator &&
            <button onClick={gameStartClick} type="button">Стартуем</button>
          }
      </div>
    </>
  );
}

export default Waiting;
