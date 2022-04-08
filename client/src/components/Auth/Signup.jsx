import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';
import { signupServer } from '../../redux/actions/user.actions';
import './style.scss';
import Modal from '../Modal/Modal';

function Signup() {
	const { isLoading, value: user, error } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ inputTypePhoto, setInputTypePhoto ] = useState();
	const [ preview, setPreview ] = useState('');
	const fileInputRef = useRef();
	const [ errorPhoto, setErrorPhoto ] = useState(false);

	useEffect(
		() => {
			if (user.id) navigate('/');
		},
		[ user ]
	);

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
		},
		[ inputTypePhoto ]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		const registrationForm = event.target;
		const formData = new FormData(registrationForm);

		dispatch(signupServer(formData));
	};

	return (
		<React.Fragment>
			{errorPhoto && <Modal message={errorPhoto} />}
			<h1>Регистрация</h1>
			<div className="sign-up">
				<form className="sign-up__form" encType="multipart/form-data" onSubmit={handleSubmit}>
					<div className="sign-up__login">
						<label className="sign-up__login-label" htmlFor="username">
							Имя пользователя:
						</label>
						<input className="sign-up__login-input" maxlength="6" name="username" type="text" />
					</div>
					<div className="sign-up__email">
						<label className="sign-up__email-label" htmlFor="email">
							Email:
						</label>
						<input className="sign-up__email-input" name="email" type="email" />
					</div>
					<div className="sign-up__password">
						<label className="sign-up__password-label" htmlFor="password">
							Пароль:
						</label>
						<input className="sign-up__password-input" name="password" type="password" />
					</div>
					<div className="sign-up__password-repeat">
						<label className="sign-up__password-repeat-label" htmlFor="confirmPassword">
							Подтвердите пароль:
						</label>
						<input className="sign-up__password-repeat-input" name="confirmPassword" type="password" />
					</div>
					<div className="sign-up__avatar">
						{preview ? (
							<div className="create-game__avatar-photo-wrapper">
								<label className="sign-up__avatar-label" htmlFor="avatar_url">
									Аватар:
								</label>{' '}
								<img src={preview} alt="" width="240" height="320" />{' '}
							</div>
						) : (
							''
						)}

						<input
							className="sign-up__avatar-input"
							name="avatar_url"
							type="file"
							ref={fileInputRef}
							accept="image/png, image/jpeg, image/jpg"
							onChange={(event) => {
								const file = event.target.files[0];
								if (file.size / 1000 < 50) {
									setInputTypePhoto(file);
								} else {
									setErrorPhoto('Размер файла не может превышать 50 Килобайт (КБ)');
									setInputTypePhoto(null);
								}
							}}
						/>
					</div>
					{error && <Error error={error} />}
					<div className="sign-up__button-wrapper">
						<button className="sign-up__button-wrapper-registration" type="submit" disabled={isLoading}>
							{isLoading ? 'Подождите...' : 'Зарегистрироваться'}
						</button>
						<Link to="/signin">
							<button className="sign-up__button-wrapper-login">Уже зарегистрированы? Войти!</button>
						</Link>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
}

export default Signup;
