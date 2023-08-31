//src/pages/PlantListPage/ListDetails.js
import React, { useState, useEffect } from "react";
import ApiService from "../../api/ApiService";
import { useParams } from "react-router-dom";
import styles from "./ListDetails.module.css"; // Importing styles as a module

const ListDetails = () => {
	const [plants, setPlants] = useState([]);
	const [listName, setListName] = useState("");
	const { listId } = useParams();

	useEffect(() => {
		const fetchListPlants = async () => {
			const response = await ApiService.getListPlants(listId);
			setPlants(response.data);
		};

		const fetchListDetails = async () => {
			const response = await ApiService.getListDetails(listId);
			setListName(response.data.list_name);
		};

		fetchListPlants();
		fetchListDetails();
	}, [listId]);

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
			<h1 className={styles["list-title"]}>{listName || "Loading..."}</h1>
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
