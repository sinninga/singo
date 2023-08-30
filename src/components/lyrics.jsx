import React, { useState, useEffect } from 'react';
import '../styles/lyrics.css';

function Lyrics(props) {

    const [lyrics, setLyrics] = useState('');

    useEffect(() => {
        if (props.trackUri) {
            const trackId = props.trackUri.split(':').pop();
            console.log(trackId);
            const apiURL = `https://spotify-lyric-api.herokuapp.com/?url=https://open.spotify.com/track/${trackId}`;
            console.log(apiURL);

            fetch(apiURL)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data && data.lines) {
                        const lyricsText = data.lines.map(line => line.words).join(' ');
                        setLyrics(lyricsText);
                        console.log(lyricsText);
                    }
                })
                .catch(error => {
                    console.error('Error fetching lyrics:', error);
                });
        }
    }, [props.trackUri]);

    return (
        <div className="lyrics">
            <p className='lyrics-text'>
                {lyrics || (props.trackUri ? 'Loading lyrics...' : 'Select a track to see lyrics')}
            </p>
        </div>
    );
}

export default Lyrics;