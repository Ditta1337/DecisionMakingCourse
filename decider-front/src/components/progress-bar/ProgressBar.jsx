import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({progress, total}) => {
    return (
        <div className="progress-bar">
            <div className="progress" style={{width: `${progress / total * 100}%`}}/>
        </div>
    )
}

export default ProgressBar