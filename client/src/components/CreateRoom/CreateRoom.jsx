import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { addNewRoom } from '../../redux/actions/room.actions';
import axios from 'axios';
import './style.scss';

function CreateRoom() {
	const dispatch = useDispatch();
	const { user, room } = useSelector((state) => state);

	useEffect(
		() => {
			if (room.room_hash) {
				navigate(`/room/${room.roomId}/hash/${room.room_hash}`);
			}
		},
		[ room ]
	);
	//Эти два поля берутся из базы и в них должны быть айди топика и игры
	const [ topicId, setTopicId ] = useState(0);
	const [ gameId, setGameId ] = useState();
	const [ topics, setTopics ] = useState([]);
	const [ games, setGames ] = useState([]);
	const navigate = useNavigate();
	const [ roomName, setRoomName ] = useState('');
	const [ roomPassword, setRoomPassword ] = useState('');
	const [ colOfPlayers, setColOfPlayers ] = useState(2);

	useEffect(() => {
		axios(`${process.env.REACT_APP_SERVER_HOST}/topics`).then((response) => {
			setTopics(response.data);
		});
	}, []);

	function clickHandler(evt) {
		evt.preventDefault();
		const currentGame = {
			userId: user.value.id,
			isCreator: true,
			roomHash: uuidv4(),
			topicId,
			gameId,
			roomName,
			roomPassword,
			colOfPlayers,
			status: 'waiting'
		};
		dispatch(addNewRoom(currentGame));
	}

	useEffect(
		() => {
			axios(`${process.env.REACT_APP_SERVER_HOST}/topics/${topicId}/games`).then((response) => {
				setGames(response.data);
			});
		},
		[ topicId ]
	);

	return (
    <>
    <h1>Создание комнаты</h1>
		<div className="generate-game">
			<div className="generate-game__name">
				<label className="generate-game__label" htmlFor="titleGameInput">
					Название игры
				</label>
				<input
					required
					className="generate-game__input"
					id="titleGameInput"
					type="text"
					name="titleGame"
					value={roomName}
					onChange={({ target }) => setRoomName(target.value)}
				/>
			</div>

			<div className="generate-game__div">
				<label className="generate-game__label" htmlFor="passwordGameInput">
					Пароль игры
				</label>
          <input
            required
            className="generate-game__input_password"
            id="passwordGameInput"
            type="password"
            value={roomPassword}
            onChange={({ target }) => setRoomPassword(target.value)}
            name="passwordGame"
          />
			</div>

			{topics.length > 0 && (
				<div className="generate-game__wrapper-game generate-game__div">
					<label className="generate-game__label" htmlFor="selectThemeGame">
						Тема игры
					</label>
					<select
						value={topicId}
						className="generate-game__select"
						onChange={({ target }) => setTopicId(Number(target.value))}
						id="selectThemeGame"
					>
						<option value="0">Выберите тему игры</option>
						{topics.map((theme) => (
							<option value={theme.id} key={theme.id}>
								{theme.title}
							</option>
						))}
					</select>
				</div>
			)}
			{games.length > 0 && (
				<div className="generate-game__wrapper-game generate-game__div">
					<label className="generate-game__label" htmlFor="selectGame">
						Варианты игр
					</label>

					<select
						value={gameId}
						onChange={({ target }) => setGameId(Number(target.value))}
						className="generate-game__select"
						id="selectGame"
					>
						<option value="">Выберите игру</option>
						{games.map((game) => (
							<option key={game.id} value={game.id}>
								{game.title}
							</option>
						))}
					</select>
				</div>
			)}

			<div className="generate-game__wrapper-game generate-game__div">
				<label className="generate-game__label" htmlFor="selectNumberOfPlayers">
					Количество игроков
				</label>
				<select
					className="generate-game__select"
					onChange={({ target }) => setColOfPlayers(Number(target.value))}
					value={colOfPlayers}
					id="selectNumberOfPlayers"
				>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
          <option value="50">Crash test</option>
				</select>
			</div>
			<button onClick={clickHandler} className="generate-game__button">
				Создать комнату
			</button>
		</div>
    </>
	);
}

export default CreateRoom;
