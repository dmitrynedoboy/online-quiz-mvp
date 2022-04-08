import React from 'react';
import './homePage.scss'
import 'animate.css';

function HomePage() {
	return (
    <>
		<div className="hello-block">
			<h2 className="hello-block__h2">ДОБРО ПОЖАЛОВАТЬ В ИГРУ</h2>
			<img className="hello-block__img" width="350" src="/images/mainimg.png" alt="" />
			<div className="hello-block__text">Для начала нашей игры, выполни вход или зарегистрируйся</div>
		</div>
    <div className="head">
      <img src="/images/head.png" className="head__img animate__animated animate__bounce animate__slower animate__infinite" alt="БОШКА" />
    </div>
    <div className="arrows">
      <img src="/images/Group710.png" className="arrows__img arrows__img1 animate__animated animate__pulse animate__infinite" alt="БОШКА" />
      <img src="/images/Group710-1.png" className="arrows__img arrows__img2 animate__animated animate__pulse animate__infinite" alt="БОШКА" />
      <img src="/images/Group838.png" className="arrows__img arrows__img3 animate__animated animate__pulse animate__infinite" alt="БОШКА" />
    </div>
    <div className="ellipse">
      <img src="/images/ellipse.png" className="ellipse__img animate__animated animate__rubberBand animate__slower animate__infinite" alt="Шарик" />
    </div>
    <div className="vector">
      <img src="/images/vector2.png" className="ellipse__img animate__animated animate__wobble animate__slower animate__infinite" alt="Звездочка" />
    </div>
    </>
	);
}

export default HomePage;
