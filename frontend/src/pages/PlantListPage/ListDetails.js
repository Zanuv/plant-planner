//src/pages/PlantListPage/ListDetails.js
import React, { useState, useEffect } from "react";
import ApiService from "../../api/ApiService";
import { useParams } from "react-router-dom";
import styles from "./ListDetails.module.css";

const ListDetails = () => {
	const [plants, setPlants] = useState([]);
	const [listName, setListName] = useState("");
	const [listDescription, setListDescription] = useState("");
	const [isEditMode, setIsEditMode] = useState(false);
	const [tempListName, setTempListName] = useState("");
	const [tempListDescription, setTempListDescription] = useState("");
	const { listId } = useParams();

	useEffect(() => {
		const fetchListPlants = async () => {
			const response = await ApiService.getListPlants(listId);
			setPlants(response.data);
		};

		const fetchListDetails = async () => {
			const response = await ApiService.getListDetails(listId);
			setListName(response.data.list_name);
			setListDescription(response.data.description);
		};

		fetchListPlants();
		fetchListDetails();
	}, [listId]);

	const handleUpdate = async () => {
		try {
			// Handle the update logic here
			const token = localStorage.getItem("token");
			const response = await ApiService.updateList(
				listId,
				{ list_name: tempListName, description: tempListDescription },
				token
			);
			if (response.status === 200) {
				setListName(tempListName);
				setListDescription(tempListDescription);
				setIsEditMode(false);
			} else {
				alert("Failed to update the list. Please try again.");
			}
		} catch (error) {
			console.error("Error updating list:", error);
			alert("An error occurred. Please try again.");
		}
	};

	const handleDeletePlant = async (plantId) => {
		try {
			await ApiService.removePlantFromList(listId, plantId);
			setPlants((prevPlants) =>
				prevPlants.filter((plant) => plant.plant_id !== plantId)
			);
			alert("Plant removed from the list successfully.");
		} catch (error) {
			console.error("Error removing plant from list:", error);
			alert("Failed to remove plant from list. Please try again.");
		}
	};

	return (
		<div>
			{isEditMode ? (
				<div className={styles["description-edit-container"]}>
					<input
						value={tempListName}
						onChange={(e) => setTempListName(e.target.value)}
						placeholder="List Name"
					/>
					<textarea
						value={tempListDescription}
						onChange={(e) => setTempListDescription(e.target.value)}
						placeholder="List Description"
					/>
					<div className={styles["edit-buttons"]}>
						<button onClick={handleUpdate}>Save</button>
						<button onClick={() => setIsEditMode(false)}>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div className={styles["description-container"]}>
					<h1 className={styles["list-title"]}>
						{listName || "Loading..."}
					</h1>
					<p className={styles["list-description"]}>
						{listDescription}
					</p>
					<div className={styles["center-button"]}>
						<button onClick={() => setIsEditMode(true)}>
							Edit
						</button>
					</div>
				</div>
			)}

			<div className={styles["list-plant-container"]}>
				<div className={styles["list-plant-list"]}>
					{plants.map((plant) => (
						<div
							key={plant.plant_id}
							className={styles["list-plant-card"]}
						>
							{plant.image_url ? (
								<img
									src={plant.image_url}
									alt={plant.plant_name || "Plant image"}
									className={styles["list-plant-image"]}
								/>
							) : (
								<p>No image available</p>
							)}
							<h3>{plant.plant_name || "Name not available"}</h3>
							<p>
								<strong>Scientific Name:</strong>{" "}
								{plant.scientific_name ||
									"Scientific name not available"}
							</p>
							<button
								onClick={() =>
									handleDeletePlant(plant.plant_id)
								}
							>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ListDetails;
