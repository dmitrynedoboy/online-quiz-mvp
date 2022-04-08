import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ModalInputPassword.scss';

function ModalInputPassword({ message, setChoosedRoom, roomId, roomHash }) {
	const navigate = useNavigate();
	const [ error, setError ] = useState(false);

	function exitHandler(evt) {
		const closestParent = evt.target.closest('.modal-window');
		closestParent.style.display = 'none';
		setChoosedRoom(false);
	}

	function submitHandler(evt) {
		evt.preventDefault();
		const roomPass = evt.target.roomPassword.value;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_HOST}/room/checkpassword`,
				{ roomPass, roomId, roomHash },
				{ withCredentials: true }
			)
			.then(({ data }) => {
				if (data.message) {
					navigate(`/room/${roomId}/hash/${roomHash}`);
				} else {
					setError(data.error);
				}
			});
	}

	return (
		<div className="modal-window">
			<div className="modal-window__content">
				{error && <div>{error}</div>}
				<div className="cl-btn-2 waiting-room__close-button" onClick={exitHandler}>
					<div>
						<div className="leftright" />
						<div className="rightleft" />
						<span className="close-btn">Выйти</span>
					</div>
				</div>
				<form onSubmit={submitHandler}>
					<div className="sign-in__password">
						<label className="sign-in__password-label" htmlFor="roomPassword">
							Введите пароль комнаты:
						</label>
						<input className="sign-in__password-input" name="roomPassword" type="text" />
						<button type="submit">Погнали</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ModalInputPassword;
