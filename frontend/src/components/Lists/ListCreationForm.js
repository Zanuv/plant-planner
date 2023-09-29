import React, { useState } from "react";
import ApiService from "../../api/ApiService";

const ListCreationForm = ({ onListCreated }) => {
    const [listName, setListName] = useState("");
    const [listDescription, setListDescription] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const response = await ApiService.createList(
                {
                    name: listName,
                    description: listDescription,
                },
                token
            );

            if (response.status === 201) {
                setMessage("List created successfully!");
                setListName("");
                setListDescription("");
                if (onListCreated) onListCreated();
            } else {
                setMessage(response.data.error || "Error creating list.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }

        setIsLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="List Name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="List Description"
                    value={listDescription}
                    onChange={(e) => setListDescription(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    Create List
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ListCreationForm;
