import React from 'react';
import './styles.scss';

function Page404() {
	return (
		<React.Fragment>
			<div>
				<div className="starsec" />
				<div className="starthird" />
				<div className="starfourth" />
				<div className="starfifth" />
			</div>

			<div className="lamp__wrap">
				<div className="lamp">
					<div className="cable" />
					<div className="cover" />
					<div className="in-cover">
						<div className="bulb" />
					</div>
					<div className="light" />
				</div>
			</div>
			<section className="error">
				<div className="error__content">
					<div className="error__message message">
						<h2 className="message__title">Такой странички нет</h2>
					</div>
					<div className="error__nav e-nav">
						<a href="/" target="_blanck" className="e-nav__link" />
					</div>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Page404;
