import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./loadingSpinner.css";

export const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <FontAwesomeIcon icon={faSpinner} spin />
            </div>
            <p className="loading-text">Loading...</p>
        </div>
    );
};
