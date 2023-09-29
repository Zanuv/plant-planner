// ApiService is a collection of methods that make calls to the backend API
import axios from "axios";

const BASE_URL = "";

const ApiService = {
    // User Authentication
    register: (data) => axios.post(`${BASE_URL}/users/signup`, data),
    login: (data) => axios.post(`${BASE_URL}/users/login`, data),
    
    // Lists
    createList: (data, token) => axios.post(`${BASE_URL}/lists`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    getLists: (token) => axios.get(`${BASE_URL}/lists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    getListDetails: (listId, token) => axios.get(`${BASE_URL}/lists/${listId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    
    // Plants
    getAllPlants: () => axios.get(`${BASE_URL}/plants`),
    createPlant: (data) => axios.post(`${BASE_URL}/plants`, data),
    searchPlantsByCommonName: (commonName) => {
        console.log("ApiService commonName Type:", typeof commonName, "Value:", commonName);
        return axios.get(`${BASE_URL}/plants/search`, {
            params: {
                common_name: commonName,
            },
        });
    },

     // Add plant to list
    addPlantToList: (listId, plantId, token) => {
        console.log('listId:', listId); // Log for debugging
        console.log('plantId:', plantId); // Log for debugging
        return axios.post(`${BASE_URL}/lists/${listId}/plants`, { plantId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    // Get plants in a list
    getListPlants: (listId, token) => axios.get(`${BASE_URL}/lists/${listId}/plants`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),

    // Delete plant from a list
    deletePlantFromList: (listId, plantId, token) => {
        return axios.delete(`${BASE_URL}/lists/${listId}/plants/${plantId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    
    // Protected Route example (If you want to use it in the frontend)
    accessProtectedRoute: (token) => axios.get(`${BASE_URL}/users/protected-route`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),

	// Delete a list
	deleteList: (listId, token) => axios.delete(`${BASE_URL}/lists/${listId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}),

    // Update a list
    updateList: (listId, description, token) => axios.put(`${BASE_URL}/lists/${listId}`, { description }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),

};

export default ApiService;
