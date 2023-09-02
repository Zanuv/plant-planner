import React, { useState } from "react";
import ApiService from "../../api/ApiService";

const PlantSearch = () => {
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = async () => {
		// API call to Perenual API using the query
		const results = await ApiService.searchPlants(query);
		setSearchResults(results.data);
	};

	const handleAddPlantToList = async (plant) => {
		// API call to the backend to add the plant to a list
		await ApiService.addPlantToList(plant);
	};

	return (
		<div>
			<input value={query} onChange={(e) => setQuery(e.target.value)} />
			<button onClick={handleSearch}>Search</button>

			{searchResults.map((plant) => (
				<div key={plant.id}>
					{plant.common_name}
					<button onClick={() => handleAddPlantToList(plant)}>
						Add to List
					</button>
				</div>
			))}
		</div>
	);
};

export default PlantSearch;
