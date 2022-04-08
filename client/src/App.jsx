import { useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInitSession } from './redux/actions/user.actions';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import CreateGame from './components/CreateGame/CreateGame';
import GlobalStat from './components/GlobalStat/GlobalStat';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Room from './components/Room/Room';
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal';
import Page404 from './components/Page404/Page404';

function App() {
	const { user: { value: user } } = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(userInitSession());
	}, []);

	let [ searchParams, setSearchParams ] = useSearchParams();
	let message = searchParams.get('message');

	return (
		<div className="main-wrapper">
			<header>
				<Nav />
				{message && <Modal message={message} />}
			</header>

			<main className={user.id ? 'container' : 'container__home'}>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/create_room" element={<CreateRoom />} />
					<Route path="/room/:id/hash/:hash" element={<Room />} />
					<Route path="/create_game" element={<CreateGame />} />
					<Route path="/global_stat" element={<GlobalStat />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<Page404 />} />
				</Routes>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default App;
