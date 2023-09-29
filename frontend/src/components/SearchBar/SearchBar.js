// components/SearchBar/SearchBar.js

import React, { useState } from 'react';
import ApiService from '../../api/ApiService';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try {
            const response = await ApiService.searchPlantsByCommonName(query);
            console.log(response);
            if (response && response.status === 200) {
                onSearch(query, response.data); // pass both the query and data
            }
        } catch (error) {
            console.error('Error searching for plants:', error);
        }
    };
    

    return (
        <div>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for plants..." 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
