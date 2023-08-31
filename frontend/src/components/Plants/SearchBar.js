import React, { useState } from "react";
import ApiService from "../../api/ApiService";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = async () => {
		if (searchTerm.trim() === "") {
			console.warn("Search term is empty. Not making a request.");
			return;
		}
		try {
			const response = await ApiService.searchPlants(searchTerm);
			onSearch(response.data.data, searchTerm);
		} catch (error) {
			console.error("Error searching for plants:", error);
		}
	};

	return (
		<div className={styles.container}>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search for plants..."
				className={styles.input}
			/>
			<button onClick={handleSearch} className={styles.button}>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
