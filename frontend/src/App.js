import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage/Home";
import Garden from "./pages/Garden/Garden";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ListDetails from "./pages/PlantListPage/ListDetails";

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

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
			setUsername(localStorage.getItem("username"));
		}
	}, []);

	return (
		<Router>
			<Navbar
				isLoggedIn={isLoggedIn}
				onLogout={handleLogout}
				onLogin={handleLogin}
				username={username}
			/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/garden"
					element={
						<PrivateRoute
							key={
								isLoggedIn ? "authenticated" : "unauthenticated"
							}
						>
							<Garden />
						</PrivateRoute>
					}
				/>
				<Route path="/list/:listId" element={<ListDetails />} />
				{/* Add more routes as needed */}
			</Routes>
		</Router>
	);
}

export default App;
