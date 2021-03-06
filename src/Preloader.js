import React from 'react';

const Preloader = () => {
    return (
        <div className="preloaderContainer">
            <p>Loading</p>
            <span>
                <i className="preloader fas fa-spinner">
                </i>
            </span>
        </div>
    );
}

export default Preloader;