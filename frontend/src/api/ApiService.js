import axios from "axios";

const BASE_URL = "http://localhost:3001";

const ApiService = {
	register: (data) => {
		return axios.post(`${BASE_URL}/users/signup`, data);
	},

	login: (data) => {
		return axios.post(`${BASE_URL}/users/login`, data);
	},

	createList: (data, token) => {
		return axios.post(`${BASE_URL}/lists`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

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

	removePlantFromList: (listId, plantId) => {
		const token = localStorage.getItem("token");
		return axios.delete(`${BASE_URL}/lists/${listId}/plants/${plantId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	getListDetails: (listId) => {
		const token = localStorage.getItem("token");
		return axios.get(`${BASE_URL}/lists/${listId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	deleteList: (listId, token) => {
		return axios.delete(`${BASE_URL}/lists/${listId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};

export default ApiService;
