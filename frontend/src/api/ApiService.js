import axios from "axios";

const BASE_URL = "";

const ApiService = {
	// Register a user
	register: (data) => {
		return axios.post(`${BASE_URL}/users/signup`, data);
	},

	// Login a user
	login: (data) => {
		return axios.post(`${BASE_URL}/users/login`, data);
	},

	// Create a list
	createList: (data, token) => {
		// Assuming data is an object with both list_name and description
		// e.g., data = { list_name: "My List", description: "Description of my list" }
		return axios.post(`${BASE_URL}/lists`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Update a list
	updateList: (listId, data, token) => {
		return axios.put(`${BASE_URL}/lists/${listId}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Get all lists for a specific user
	getLists: (token) => {
		return axios.get(`${BASE_URL}/lists`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Search for plants using the backend proxy route
	searchPlants: (searchTerm, page = 1) => {
		return axios.get(`${BASE_URL}/api/perenual/search`, {
			params: {
				q: searchTerm,
				page: page,
			},
		});
	},

	// Add a plant to a specific list
	addPlantToList: (listId, plant, token) => {
		return axios.post(`${BASE_URL}/lists/${listId}/add-plant`, plant, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Get Plant Details
	getPlantDetails: (plantId) => {
		return axios.get(`${BASE_URL}/api/perenual/plant/${plantId}`);
	},

	getListPlants: (listId) => {
		const token = localStorage.getItem("token");
		return axios.get(`${BASE_URL}/lists/${listId}/plants`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Delete a plant from a specific list
	removePlantFromList: (listId, plantId) => {
		const token = localStorage.getItem("token");
		return axios.delete(`${BASE_URL}/lists/${listId}/plants/${plantId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Get list details
	getListDetails: (listId) => {
		const token = localStorage.getItem("token");
		return axios.get(`${BASE_URL}/lists/${listId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Delete a list
	deleteList: (listId, token) => {
		return axios.delete(`${BASE_URL}/lists/${listId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};

export default ApiService;
