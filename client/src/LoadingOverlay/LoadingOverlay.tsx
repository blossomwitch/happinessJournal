import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from 'react-loader-spinner';
import './LoadingOverlay.scss';

interface LoadingOverlayProps {
    enabled:boolean;
    bgColor:string;
    spinnerColor:string;
}

const LoadingOverlay = ({enabled, bgColor, spinnerColor}:LoadingOverlayProps) => {

    let styles:Object = {
        backgroundColor:bgColor
    }

    return (
        (enabled)
        ? 
        <div className="loading-overlay" style={styles}>
            <TailSpin
                color={spinnerColor}
                height={50}
                width={50}
            />
        </div>
        : <div></div>
    );
}

export default LoadingOverlay;