import React, { useEffect } from 'react';
import '../styles/trackInfo.css';

const TrackInfo = ({
    current_track,
    currentTime,
    totalDuration,
    formatTime,
    player,
    is_paused
}) => {
    useEffect(() => {
        const handleKeyPress = (event) => {

            if (event.keyCode === 37) { // 37 is the key code for the left arrow key
                // Simulate a click on the rewind-button
                const rewindButton = document.querySelector(".rewind-button");
                if (rewindButton) {
                    rewindButton.click();
                    rewindButton.focus();
                }
            } else if (event.keyCode === 39) { // 39 is the key code for the right arrow key
                // Simulate a click on the fast-forward-button
                const fastForwardButton = document.querySelector(".fast-forward-button");
                if (fastForwardButton) {
                    fastForwardButton.click();
                    fastForwardButton.focus();
                }
            } else if (event.keyCode === 40 || event.keyCode === 38) { // 39 is the key code for the right arrow key
                // Simulate a click on the fast-forward-button
                const playButton = document.querySelector(".play-button");
                if (playButton) {
                    playButton.click();
                    playButton.focus();
                }
            }
        };

        // Add the event listener when the component mounts
        window.addEventListener('keydown', handleKeyPress);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <>
        <div className="track-info-container">                  
            {current_track.name && (
            <div className="main-wrapper">
                <img src={current_track.album.images[0].url} 
                    className="now-playing-cover" alt="" />
                <div className="now-playing-side">
                    <div className="now-playing-name">
                        {current_track.name}
                    </div>
                    <div className="now-playing-artist">
                        {current_track.artists[0].name}
                    </div>
                    <div className="track-time">
                        <span>{formatTime(currentTime)}</span> / <span>{formatTime(totalDuration)}</span>
                    </div>
                </div>
            </div>
            )}
        </div> 
        <div className="playback-controls">
            {current_track.name && (
            <div className="btn-container">
                <button className="btn-controls rewind-button" onClick={() => { player.seek(currentTime * 1000 - 5000) }} >
                    &lt;&lt;
                </button>
                <button className="btn-controls play-button" onClick={() => { player.togglePlay() }} >
                    { is_paused ? "PLAY" : "PAUSE" }
                </button>
                <button className="btn-controls fast-forward-button" onClick={() => { player.seek(currentTime * 1000 + 5000) }} >
                    &gt;&gt;
                </button>
            </div>
            )}
        </div>
        </>
    );
}

export default TrackInfo;