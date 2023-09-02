// pages/Garden/Garden.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListCreationForm from "../../components/Lists/ListCreationForm";
import SearchBar from "../../components/Plants/SearchBar";
import PlantSearchModal from "../../components/Plants/PlantSearchModal";
import ApiService from "../../api/ApiService";
import "./Garden.css";

const Garden = () => {
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMoreResults, setHasMoreResults] = useState(true);
	const [currentSearchTerm, setCurrentSearchTerm] = useState("");
	const [userLists, setUserLists] = useState([]);

	const fetchUserLists = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Token not found in local storage.");
			}

			const response = await ApiService.getLists(token);
			if (!response || response.status !== 200) {
				throw new Error(
					`Failed to fetch lists: ${
						response?.data?.error || "Unknown error"
					}`
				);
			}

			setUserLists(response.data);
		} catch (error) {
			console.error(
				"An error occurred while fetching lists:",
				error.message
			);
		}
	};

	const handleCloseListModal = () => {
		setIsListModalOpen(false);
		fetchUserLists();
	};

	const handleCloseSearchModal = () => {
		setIsSearchModalOpen(false);
	};

	const handleDeleteList = async (listId, event) => {
		try {
			// Stop event propagation to prevent triggering parent handlers
			event.stopPropagation();

			const token = localStorage.getItem("token");
			await ApiService.deleteList(listId, token);
			setUserLists((prevLists) =>
				prevLists.filter((list) => list.list_id !== listId)
			);
			alert("List deleted successfully!");
		} catch (error) {
			console.error("Error deleting list:", error);
			alert("Failed to delete list. Please try again.");
		}
	};

	useEffect(() => {
		const fetchMorePlants = async () => {
			try {
				const response = await ApiService.searchPlants(
					currentSearchTerm,
					currentPage
				);
				const results = response.data.data || [];

				if (results.length === 0) {
					setHasMoreResults(false);
				} else {
					setSearchResults(results);
				}
			} catch (error) {
				console.error("Error fetching plants:", error);
			}
		};

		if (currentSearchTerm.trim() !== "") {
			fetchMorePlants();
		}
	}, [currentPage, currentSearchTerm]);

	useEffect(() => {
		fetchUserLists();
	}, []);

	return (
		<div className="garden-container">
			{/* Search Bar */}
			<div className="search-container">
				<SearchBar
					onSearch={(results, searchTerm) => {
						setSearchResults(results);
						setCurrentSearchTerm(searchTerm);
						setCurrentPage(1);
						setIsSearchModalOpen(true);
					}}
				/>
			</div>

			{/* Lists container */}
			<div className="lists-container">
				{userLists.map((list) => (
					<div key={list.list_id} className="list-item">
						<Link to={`/list/${list.list_id}`}>
							{list.list_name}
						</Link>

						<p>{list.description}</p>
						<button
							onClick={(e) => handleDeleteList(list.list_id, e)}
						>
							Delete
						</button>
					</div>
				))}
				<div
					className="new-list-button"
					onClick={() => setIsListModalOpen(true)}
				>
					+
				</div>
			</div>

			{/* Modal for plant search */}
			<PlantSearchModal
				isOpen={isSearchModalOpen}
				onClose={handleCloseSearchModal}
				plants={searchResults}
				onNext={() => setCurrentPage((prev) => prev + 1)}
				onPrev={() => setCurrentPage((prev) => prev - 1)}
				hasMoreResults={hasMoreResults}
				currentPage={currentPage}
				userLists={userLists}
			/>

			{/* Modal for list creation */}
			{isListModalOpen && (
				<div
					className="modal"
					onClick={(e) =>
						e.target.className === "modal" &&
						setIsListModalOpen(false)
					}
				>
					<div className="modal-content">
						<ListCreationForm
							onListCreated={handleCloseListModal}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Garden;
