import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import './styles.scss';
import UserStat from './UserStat';

function Profile() {
	const { user } = useSelector((state) => state);
	const [ login, setLogin ] = useState();
	const [ email, setEmail ] = useState();
	const [ avatar, setAvatar ] = useState(user.value.avatar);
	const [ inputTypePhoto, setInputTypePhoto ] = useState();
	const [ preview, setPreview ] = useState('');
	const [ userStats, setUserStats ] = useState();
	const [ status, setStatus ] = useState(false);
	const [ error, setError ] = useState(false);

	const fileInputRef = useRef();

	useEffect(
		() => {
			if (inputTypePhoto) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result);
				};
				reader.readAsDataURL(inputTypePhoto);
			} else {
				setPreview(null);
			}
			setLogin(user.value.name);
			setEmail(user.value.userEmail);
			setAvatar(user.value.avatar);
			if (user.value.id) {
				fetch(`${process.env.REACT_APP_SERVER_HOST}/auth/profile/${user.value.id}`)
					.then((response) => response.json())
					.then((stats) => setUserStats(stats));
			}
		},
		[ user, inputTypePhoto ]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		formData.append('id', user.value.id);

		const options = {
			method: 'POST',
			body: formData
		};

		fetch(`${process.env.REACT_APP_SERVER_HOST}/auth/profile`, options);
	};

	function handleClick() {
		setStatus(true);
	}

	return (
		<React.Fragment>
			{error && <Modal message={error} />}

			<h1>Профиль</h1>
			<div className="profile">
				<form onSubmit={handleSubmit} method="POST">
					<div className="profile_login">
						<label className="profile__login-label" htmlFor="loginProfile">
							Логин
						</label>
						<input
							name="username"
							className="profile__login-input"
							id="loginProfile"
							value={login}
							onChange={(event) => setLogin(event.target.value)}
						/>
					</div>
					<div className="profile_email">
						<label className="profile__email-label" htmlFor="emailProfile">
							Почта
						</label>
						<input
							name="email"
							className="profile__email-input"
							id="emailProfile"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
					<div className="profile__avatar">
						<div className="profile__avatar-left">
							<label className="profile__avatar-label" htmlFor="avatarProfile">
								Аватарка
							</label>
							<img
								src={
									preview ? (
										preview
									) : avatar ? (
										`${process.env.REACT_APP_STATIC_PATH}/${avatar}`
									) : (
										`${process.env.REACT_APP_STATIC_PATH}/defaultUser.png`
									)
								}
								alt=""
								width="240"
								height="240"
							/>
						</div>
						<input
							className="profile__avatar-input"
							type="file"
							id="avatarProfile"
							ref={fileInputRef}
							name="avatar_url"
							accept="image/png, image/jpeg, image/jpg"
							onChange={(event) => {
								const file = event.target.files[0];
								if (file.size / 1000 < 50) {
									setInputTypePhoto(file);
								} else {
									setError('Размер файла не может превышать 50 Килобайт (КБ)');
									setInputTypePhoto(null);
								}
							}}
						/>
					</div>
					<button className="profile__button" type="submit">
						Изменить
					</button>
				</form>
				<button className="profile__stats-button" onClick={() => setStatus(!status)}>
					Показать статистику
				</button>
				{userStats && status && <UserStat userStats={userStats} />}
			</div>
		</React.Fragment>
	);
}

export default Profile;
