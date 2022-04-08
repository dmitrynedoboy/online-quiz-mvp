import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalInputPassword from './ModalInputPassword';

function GameCard({ img, name, isPassword, roomId, roomHash }) {
	const [ choosedRoom, setChoosedRoom ] = useState(false);

	function handleClick() {
		setChoosedRoom(true);
	}

	return (
		<React.Fragment>
			{choosedRoom && (
				<ModalInputPassword
					message="input password"
					setChoosedRoom={setChoosedRoom}
					roomId={roomId}
					roomHash={roomHash}
				/>
			)}
			{isPassword ? (
				<div className="game-card" onClick={handleClick}>
					<div className="game-card_inside">
						<img src={img} alt="name" className="game-card__img" width="300" height="150" />
						<h3 className="game-card__title">{name}</h3>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/OOjs_UI_icon_lock.svg/1200px-OOjs_UI_icon_lock.svg.png"
							alt="locked"
							width="40"
							height="40"
						/>
					</div>
				</div>
			) : (
				<Link className="game-card" to={`/room/${roomId}/hash/${roomHash}`}>
					<div className="game-card_inside">
						<img src={img} alt="name" className="game-card__img" width="300" height="150" />
						<h3 className="game-card__title">{name}</h3>
					</div>
				</Link>
			)}
		</React.Fragment>
	);
}

export default GameCard;
