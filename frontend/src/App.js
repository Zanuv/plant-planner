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
import ListDetails from "./pages/PlantListPage/ListDetails";

function RootComponent({ isLoggedIn, setIsLoggedIn, setUsername }) {
	const navigate = useNavigate(); // Use the useNavigate hook here
	const [initializationDone, setInitializationDone] = useState(false);

	useEffect(() => {
		if (!initializationDone) {
			const token = localStorage.getItem("token");
			if (token) {
				setIsLoggedIn(true);
				setUsername(localStorage.getItem("username"));
				navigate("/garden"); // Redirect to Garden page
			}
			setInitializationDone(true); // Set the initialization flag to true
		}
	}, [navigate, setIsLoggedIn, setUsername, initializationDone]);

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
