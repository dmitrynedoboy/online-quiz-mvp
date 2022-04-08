import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logoutServer } from '../../redux/actions/user.actions';
import './menu.scss';

function Menu() {
	const dispatch = useDispatch();
	const { value, error } = useSelector((state) => state.user);
	const [ isChecked, setIsChecked ] = useState('');

	function handleClick() {
		setIsChecked('');
	}

	return (
		<React.Fragment>
			<div className="header_menu">
				<input id="menu__toggle" type="checkbox" onClick={() => setIsChecked(!isChecked)} checked={isChecked} />
				<label className="menu__btn" htmlFor="menu__toggle">
					<span />
				</label>

				<ul className="menu__box">
					<li>
						<NavLink
							onClick={handleClick}
							to="/"
							className={({ isActive }) => (isActive ? 'active menu__item' : 'menu__item')}
						>
							Главная
						</NavLink>
					</li>
					{value.id ? (
						<React.Fragment>
							<li>
								<NavLink onClick={handleClick} className="menu__item" to="/create_room">
									Создать комнату
								</NavLink>
							</li>
							<li>
								<NavLink onClick={handleClick} className="menu__item" to="/create_game">
									Создать игру
								</NavLink>
							</li>
							<li>
								<NavLink onClick={handleClick} className="menu__item" to="/global_stat">
									Статистика
								</NavLink>
							</li>
							<li>
								<NavLink onClick={handleClick} className="menu__item" to="/profile">
									Профиль
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/"
									className="green-button-border menu__item"
									onClick={() => {
										dispatch(logoutServer());
										setIsChecked('');
									}}
								>
									Выход
								</NavLink>
								{error && alert(error)}
							</li>
						</React.Fragment>
					) : (
						<React.Fragment>
							<li>
								<NavLink onClick={handleClick} className="menu__item" to="/signup">
									Регистрация
								</NavLink>
							</li>
							<li>
								<NavLink onClick={handleClick} className="menu__item green-button" to="/signin">
									Войти
								</NavLink>
							</li>
						</React.Fragment>
					)}
				</ul>
			</div>
		</React.Fragment>
	);
}

export default Menu;
