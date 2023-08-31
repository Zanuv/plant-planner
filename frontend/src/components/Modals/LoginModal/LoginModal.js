import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";
import ApiService from "../../../api/ApiService";

function LoginModal({ isOpen, onClose, onLogin }) {
	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const modalRef = useRef(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!usernameOrEmail || !password) {
			alert("Both fields are required!");
			return;
		}

		try {
			const response = await ApiService.login({
				username: usernameOrEmail,
				password,
			});

			if (response.data && response.data.token) {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("username", response.data.username); // store the username in localStorage
				onLogin(response.data.username);
				onClose();
				navigate("/garden");
			} else {
				alert("Login failed!");
			}
		} catch (error) {
			console.error("Login error:", error);
			if (
				error.response &&
				error.response.data &&
				error.response.data.error
			) {
				alert(error.response.data.error);
			} else {
				alert("Login error. Please try again.");
			}
		}
	};

	const handleOverlayClick = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal-content" ref={modalRef}>
				<button onClick={onClose} className="close-button">
					X
				</button>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Username or Email"
						value={usernameOrEmail}
						onChange={(e) => setUsernameOrEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
}

export default LoginModal;
