import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Component to display a back button that navigates to the previous page.
 * @returns {JSX.Element} - The BackButton component.
 */
const BackButton = () => {
    const navigate = useNavigate();

    /**
     * Handles the click event to navigate to the previous page.
     */
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <button className="btn btn-secondary mt-3 bg-info" onClick={handleBackClick}>
            Back
        </button>
    );
};

export default BackButton;