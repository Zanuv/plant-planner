// components/Plants/PlantSearchModal.js

import React, { useRef, useEffect } from "react";
import PlantList from "./PlantList";
import "./PlantSearchModal.css";

const PlantSearchModal = ({
	isOpen,
	onClose,
	plants,
	onNext,
	onPrev,
	hasMoreResults,
	currentPage,
	onPlantClick,
	userLists,
}) => {
	const modalContentRef = useRef(null);

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		if (modalContentRef.current) {
			modalContentRef.current.scrollTop = 0;
		}
	}, [plants]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="modal" onClick={handleBackdropClick}>
			<div className="modal-content" ref={modalContentRef}>
				<PlantList
					plants={plants}
					onPlantClick={onPlantClick}
					userLists={userLists}
				/>
				<div className="pagination-controls">
					<button onClick={onPrev} disabled={currentPage === 1}>
						Previous
					</button>
					<button onClick={onNext} disabled={!hasMoreResults}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PlantSearchModal;
