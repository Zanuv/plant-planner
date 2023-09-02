import React, { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import RegisterModal from "../Modals/RegisterModal/RegisterModal";
import LoginModal from "../Modals/LoginModal/LoginModal";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

function Navbar({ isLoggedIn, onLogout, onLogin, username }) {
	const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
	const [isLoginModalOpen, setLoginModalOpen] = useState(false);
	const navigate = useNavigate(); // <-- Use the useNavigate hook here

	const handleLoginNavbar = (user) => {
		onLogin(user);
		navigate("/garden");
	};

	const handleLogoutNavbar = () => {
		onLogout();
		navigate("/");
	};

	return (
		<div className="navbar">
			<div className="navbar-left">
				<FontAwesomeIcon icon={faSeedling} className="navbar-icon" />
				<span className="navbar-title">Plant Planner</span>
			</div>
			<div className="navbar-right">
				{!isLoggedIn ? (
					<>
						<button
							className="navbar-button"
							onClick={() => setLoginModalOpen(true)}
						>
							Login
						</button>
						<button
							className="navbar-button"
							onClick={() => setRegisterModalOpen(true)}
						>
							Register
						</button>
					</>
				) : (
					<>
						<span>Welcome, {username}!</span>
						<button
							className="navbar-button"
							onClick={handleLogoutNavbar}
						>
							Logout
						</button>
					</>
				)}
			</div>

			<LoginModal
				isOpen={isLoginModalOpen}
				onClose={() => setLoginModalOpen(false)}
				onLogin={handleLoginNavbar}
			/>
			<RegisterModal
				isOpen={isRegisterModalOpen}
				onClose={() => setRegisterModalOpen(false)}
			/>
		</div>
	);
}

export default Navbar;
