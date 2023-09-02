import React, { useState, useRef } from "react";
import ApiService from "../../../api/ApiService";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const modalRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!username || !email || !password || !confirmPassword) {
			alert("All fields are required!");
			return;
		}

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		// Send data to the backend
		try {
			const response = await ApiService.register({
				username,
				email,
				password,
			});

			// Assuming the backend responds with a token on successful registration
			if (response.data && response.data.token) {
				alert("Registration successful!");
				onClose(); // Close the modal
				// Store the token here if needed
			} else {
				alert("Registration failed!");
			}
		} catch (error) {
			console.error("Error during registration:", error);
			alert("Registration error. Please try again.");
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
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button type="submit">Register</button>
				</form>
			</div>
		</div>
	);
}

export default RegisterModal;
