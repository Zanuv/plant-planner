import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage/Home";
import Garden from "./pages/Garden/Garden";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ListDetails from "./pages/ListDetails/ListDetails";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";

function RootComponent({ isLoggedIn, setIsLoggedIn, setUsername }) {
    const navigate = useNavigate();
	const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && initialLoad) {
			setIsLoggedIn(true);
			setUsername(localStorage.getItem("username"));
			navigate("/garden");
			setInitialLoad(false); 
		}
	}, [navigate, setIsLoggedIn, setUsername, initialLoad]);
	

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/garden"
				element={
					<PrivateRoute
						key={isLoggedIn ? "authenticated" : "unauthenticated"}
					>
						<Garden />
					</PrivateRoute>
				}
			/>
			<Route path="/list/:listId" element={<ListDetails />} />
			<Route path="/search-results/:query" element={<SearchResultsPage />} />
		</Routes>
	);
}

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState(null);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
	};

	const handleLogin = (user) => {
		setIsLoggedIn(true);
		setUsername(user);
	};

	return (
		<Router>
			<Navbar
				isLoggedIn={isLoggedIn}
				onLogout={handleLogout}
				onLogin={handleLogin}
				username={username}
			/>
			<RootComponent
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
				setUsername={setUsername}
			/>
		</Router>
	);
}

export default App;
