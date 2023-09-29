// ListDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../api/ApiService';
import styles from './ListDetails.module.css';

const ListDetails = () => {
    const [listDetails, setListDetails] = useState(null);
    const [plants, setPlants] = useState([]);
    const [description, setDescription] = useState('');
    const [editing, setEditing] = useState(false); // New state for editing mode
    const { listId } = useParams();

    useEffect(() => {
        const fetchListDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await ApiService.getListDetails(listId, token);
                if (response && response.status === 200) {
                    setListDetails(response.data);
                    setDescription(response.data.description || ''); // Set initial description
                }
            } catch (error) {
                console.error('Error fetching list details:', error);
            }
        };

        const fetchPlantsInList = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await ApiService.getListPlants(listId, token);
                if (response && response.status === 200) {
                    setPlants(response.data.rows || []); // Ensure it defaults to an empty array if undefined
                }
            } catch (error) {
                console.error('Error fetching plants for list:', error);
            }
        };

        fetchListDetails();
        fetchPlantsInList();
    }, [listId]);

    const handleUpdateDescription = async (event) => {
        event.preventDefault(); // Prevent the default action
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            await ApiService.updateList(listId, description, token);
            setEditing(false); // Exit editing mode after updating
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };
    
    const handleDeletePlant = async (plantId) => {
        try {
            // Assuming you have a delete API endpoint and you pass the plantId and listId
            const token = localStorage.getItem('token');
            await ApiService.deletePlantFromList(listId, plantId, token);
            // Update the plants state to remove the deleted plant
            setPlants(plants.filter(plant => plant.id !== plantId));
        } catch (error) {
            console.error('Error deleting plant:', error);
        }
    };
    

    return (
        <div>
            {listDetails ? (
                <>
                    <h2 className={styles.h2}>{listDetails.name}</h2>
                    {editing ? (
                        <form onSubmit={handleUpdateDescription}>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button type="submit">Update Description</button>
                            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div className={styles.description}>
                            <p>{description}</p>
                            <button onClick={() => setEditing(true)} className={styles.editButton}>Edit Description</button>
                        </div>
                    )}
                    <div className={styles.plantCardContainer}>
                        {plants.length > 0 ? (
                            plants.map(plant => (
                                <div key={plant.id} className={styles.plantCard}>
                                    <div className={styles.plantCardContent}>
                                        <h4>{plant.common_name}</h4>
                                        <p className={styles.plantScientificName}>{plant.scientific_name}</p>
                                        <img src={plant.icon_path} alt={plant.common_name} className={styles.plantIcon} />
                                        <p>{plant.description}</p>
                                        <p className={styles.watering}>Watering: {plant.watering}</p>
                                        <p className={styles.sunlight}>Sunlight: {plant.sunlight}</p>
                                        <p className={styles.zoning}>Zoning: {plant.zoning}</p>
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <button onClick={() => handleDeletePlant(plant.id)} className={styles.deleteButton}>Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No plants in this list yet.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
    
};

export default ListDetails;