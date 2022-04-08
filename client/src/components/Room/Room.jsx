import React, { useEffect, useState, useCallback } from 'react';
import { initiateSocket, disconnectSocket, currentRoom, startGameSocket, sendAnswer} from '../../sockets/sockets.init';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNewRoomInState, clearRoomAC, initRoom, changeRoomStatusAC } from '../../redux/actions/room.actions';
import { initGameAC } from '../../redux/actions/game.actions';
import Game from './Game';
import Waiting from './Waiting';
import FinalStats from './FinalStats';

function WaitingRoom() {
  const dispatch = useDispatch();

  const { hash: roomHash, id: roomIdQuery } = useParams();
  const { room, waitingRooms, user: { value: user } } = useSelector(state => state);

  const [currentUsers, setCurrentUsers] = useState();
  const [gameStart, setGameStart] = useState(true)
  const [userData, setUserData] = useState();
  const [socketRoom, setSocketRoom] = useState();
  const [fullRoom, setFullRoom] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [players, setPlayares] = useState();
  const [stats, setStats] = useState(['ПУСТАЯ СТАТИСТИКА']);
  const [finishedQuestions, setFinishedQuestions] = useState();
  const [lastResult, setLastResult] = useState();
  const [userAnswers, setUserAnswers] = useState();

  useEffect(() => {

    if (!userData) {
      if (!room.roomId) dispatch(initRoom(roomHash))

      setUserData({
        userId: user.id,
        roomId: Number(roomIdQuery),
        roomHash,
        isCreator: user.name === room.creator
      });


    } else {
      if (roomHash) initiateSocket({
        ...userData,
        setCurrentUsers,
        gameStart,
        setGameStart,
        gameStartClick,
        setSocketRoom,
        dispatch,
        setCurrentQuestion,
        setFullRoom,
        setStats,
        setFinishedQuestions,
        setUserAnswers,
        room
      });

      return () => {
        disconnectSocket(userData);
      }
    }
  }, [userData]);


  async function gameStartClick() {
    startGameSocket({ ...userData, currentQuestion })
  }

  return (
    <div className="room">
      {
        room?.status === 'playing' && currentQuestion && <Game userAnswers={userAnswers} stats={stats} currentQuestion={currentQuestion} finishedQuestions={finishedQuestions} sendAnswer={sendAnswer}/>
      }

      {
      room?.status === 'finished' &&  <FinalStats stats={stats} finishedQuestions={finishedQuestions} />
      }

      {
        room.roomStatus === 'waiting' && <Waiting currentUsers={currentUsers} isCreator={user.name === room.creator} gameStartClick={gameStartClick} room={room} fullRoom={fullRoom}/>
      }
    </div>
  );
}

export default WaitingRoom;
