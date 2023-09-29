// pages/SearchResultsPage/SearchResultsPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../api/ApiService';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const [userLists, setUserLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await ApiService.searchPlantsByCommonName(query);
                if (response && response.status === 200) {
                    setResults(response.data);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        const fetchUserLists = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await ApiService.getLists(token);
                if (response && response.status === 200) {
                    console.log('Fetched user lists:', response.data);
                    setUserLists(response.data);
                    if (response.data.length > 0) {
                        setSelectedListId(response.data[0].id.toString());
                        console.log('Set initial selectedListId:', response.data[0].id.toString());
                    }
                }
            } catch (error) {
                console.error('Error fetching user lists:', error);
            }
        };
    
        fetchResults(); // Calling the fetchResults function
        fetchUserLists(); // Calling the fetchUserLists function
    }, [query]);

    const handleAddPlantToList = async (plantId) => {
        try {
            const token = localStorage.getItem("token");
            await ApiService.addPlantToList(selectedListId, plantId, token);
        } catch (error) {
            console.error('Error adding plant to list:', error);
        }
    };

    return (
        <div className="search-results-container">
            <h2>Search Results</h2>
            {results.map(plant => (
                <div key={plant.id} className="plant-card">
                    <h3>{plant.common_name}</h3>
                    <p className="plant-scientific-name">{plant.scientific_name}</p>
                    <img src={plant.icon_path} alt={plant.common_name} className="plant-icon" />
                    <p>{plant.description}</p>
                    <p className="watering">Watering: {plant.watering}</p>
                    <p className="sunlight">Sunlight: {plant.sunlight}</p>
                    <p className="zoning">Zoning: {plant.zoning}</p>
                    <select onChange={(e) => setSelectedListId(e.target.value)}>
                        {userLists.map(list => (
                            <option key={list.id} value={list.id}>
                                {list.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => handleAddPlantToList(plant.id)}>Add to List</button>
                </div>
            ))}
        </div>
    );
};

export default SearchResultsPage;