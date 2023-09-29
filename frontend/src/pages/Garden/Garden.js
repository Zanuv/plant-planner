// pages/Garden/Garden.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../api/ApiService";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Garden.css";

const Garden = () => {
    const [userLists, setUserLists] = useState([]);
    const [newListName, setNewListName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserLists();
    }, []);

    const fetchUserLists = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await ApiService.getLists(token);
            if (response && response.status === 200) {
                setUserLists(response.data);
            }
        } catch (error) {
            console.error("Error fetching user lists:", error);
        }
    };

    const handleDeleteList = async (listId) => {
        try {
            const token = localStorage.getItem("token");
            await ApiService.deleteList(listId, token);
            fetchUserLists();
        } catch (error) {
            console.error("Error deleting the list:", error);
        }
    };

    const handleCreateList = async () => {
        try {
            const token = localStorage.getItem("token");
            await ApiService.createList({ name: newListName }, token);
            fetchUserLists();
            setNewListName("");
        } catch (error) {
            console.error("Error creating the list:", error);
        }
    };

    const handleSearch = async (query) => {
        try {
            const results = await ApiService.searchPlantsByCommonName(query);
            if (results && results.status === 200) {
                navigate(`/search-results/${query}`, { state: { results: results.data } });
            }
        } catch (error) {
            console.error("Error searching for plants:", error);
        }
    };
    
    return (
        <div className="garden-container">
            <h2>Welcome to Your Garden Hub</h2>
            <div className="search-container">
                <SearchBar onSearch={handleSearch} />
                <div className="create-list-container">
                    <input 
                        type="text" 
                        value={newListName} 
                        onChange={(e) => setNewListName(e.target.value)} 
                        placeholder="New List Name" 
                    />
                    <button onClick={handleCreateList}>Create</button>
                </div>
            </div>
            <div className="lists-container">
                {userLists.map(list => (
                    <div key={list.id} className="list-item">
                    <img src="https://raw.githubusercontent.com/Zanuv/plantimages/main/garden.jpg" alt="List Thumbnail" className="list-image" />
                    <Link to={`/list/${list.id}`} style={{ color: 'green', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none' }}>
                        {list.name}
                    </Link>
                    <p>{list.description}</p>
                    <button onClick={() => handleDeleteList(list.id)}>Delete</button>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Garden;
