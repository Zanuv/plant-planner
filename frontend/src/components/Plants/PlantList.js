// components/Plants/PlantList.js

import React from "react";
import PlantCard from "./PlantCard";
import "../../pages/Garden/Garden.css";

const PlantList = ({ plants, userLists }) => {
	return (
		<div className="plant-list-container">
			{plants.map((plant, index) => (
				<PlantCard
					key={`${plant.id}-${index}`}
					plant={plant}
					userLists={userLists}
				/>
			))}
		</div>
	);
};

export default PlantList;
