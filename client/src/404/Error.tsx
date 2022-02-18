import "./Error.scss";
import { Link } from "react-router-dom";

const Error = () => {
    return(
        <div className="error-wrapper">
            <div className="error-title">
                <h1 className="error-404">404 Page Not Found</h1>
            </div>
            <div className="error-content">
                The Page you are looking for doesn't exist or an others error occurred.
            </div>
            <div className="error-button">
                <Link to="/" className="btn-link">Go back Home</Link>
            </div>
        </div>
    );
}

export default Error;