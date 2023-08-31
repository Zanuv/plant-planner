// components/Plants/PlantCard.js

import React, { useRef } from "react";
import ApiService from "../../api/ApiService";

const PlantCard = ({ plant, userLists }) => {
	const listRef = useRef(null);

	const handleAddPlantToList = async (event) => {
		event.stopPropagation();

		try {
			const selectedListId = listRef.current.value;
			const token = localStorage.getItem("token");
			await ApiService.addPlantToList(selectedListId, plant, token);
			alert("Plant added to the list!");
		} catch (error) {
			console.error("Error adding plant to list:", error);
			alert("Failed to add plant to list. Please try again.");
		}
	};

	const handleDropdownClick = (event) => {
		event.stopPropagation();
	};

	return (
		<div className="plant-card">
			{plant.default_image && (
				<img
					src={plant.default_image.thumbnail}
					alt={plant.common_name}
				/>
			)}
			<h3>{plant.common_name}</h3>
			<p>{plant.scientific_name[0]}</p>
			<select ref={listRef} onClick={handleDropdownClick}>
				{userLists.map((list) => (
					<option value={list.list_id} key={list.list_id}>
						{list.list_name}
					</option>
				))}
			</select>
			<button onClick={(event) => handleAddPlantToList(event)}>
				Add to List
			</button>
		</div>
	);
};

export default PlantCard;
