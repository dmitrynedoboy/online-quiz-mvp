import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';
import { signinServer } from '../../redux/actions/user.actions';
import './style.scss'

function Signin() {
	const { isLoading, value, error } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (value.id) navigate('/');
		},
		[ value ]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		const signinForm = event.target;
		const formData = new FormData(signinForm);
		const signinData = Object.fromEntries(formData);
		dispatch(signinServer(signinData));
	};

	return (
    <>
    <h1>Авторизация</h1>
		<div className="sign-in">
			<form className="sign-in__form" onSubmit={handleSubmit}>
				<div className="sign-in__email">
					<label className="sign-in__emeail-label" htmlFor="email">
						Email:
					</label>
					<input className="sign-in__email-input" name="email" type="email" />
				</div>
				<div className="sign-in__password">
					<label className="sign-in__password-label" htmlFor="password">
						Пароль:
					</label>
					<input className="sign-in__password-input" name="password" type="password" />
				</div>
				{error && <Error error={error} />}
				<div className="sign-in__button-wrapper">
					<button className="sign-in__button-wrapper-login" type="submit" disabled={isLoading}>
						{isLoading ? 'Подождите...' : 'Войти'}
					</button>
					<Link to="/signup">
						<button className="sign-in__button-wrapper-registration">
							Не зарегистрированы? Пройти регистрацию!
						</button>
					</Link>
				</div>
			</form>
		</div>
    </>
	);
}

export default Signin;
