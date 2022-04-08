import Logo from './Logo';
import Menu from './Menu';
import React from 'react';

function Nav() {
	return (
		<div className="container header-wrapper">
			<Logo />
			<Menu />
		</div>
	);
}

export default Nav;
