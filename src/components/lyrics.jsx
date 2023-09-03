import React, { useState, useEffect } from 'react';
import '../styles/lyrics.css';

function Lyrics(props) {

    const [lyrics, setLyrics] = useState('');
    const [nextLine, setNextLine] = useState('');
    const [previousLine, setPreviousLine] = useState('');
    const [currentLine, setCurrentLine] = useState('');
    const [upcomingLine, setUpcomingLine] = useState('');
    const [translatedLyrics, setTranslatedLyrics] = useState('');
    const [translatedPreviousLine, setTranslatedPreviousLine] = useState('');
    const [translatedUpcomingLine, setTranslatedUpcomingLine] = useState('');


    useEffect(() => {
        if (props.trackUri) {
            const trackId = props.trackUri.split(':').pop();
            const apiURL = `https://spotify-lyric-api.herokuapp.com/?url=https://open.spotify.com/track/${trackId}`;

            fetch(apiURL)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data && data.lines) {
                        const currentTimeInMilliseconds = props.currentTime * 1000;
                        console.log('currentTimeInMilliseconds:', currentTimeInMilliseconds);

                        let closestLine = null;
                        let closestTimeDifference = Number.MAX_SAFE_INTEGER;
                        let previousLine = null;
                        let upcomingLine = null;

                        for (const line of data.lines) {
                            const startTimeMs = parseInt(line.startTimeMs);
                            const timeDifference = Math.abs(currentTimeInMilliseconds - startTimeMs);

                            if (startTimeMs <= currentTimeInMilliseconds) {
                                if (!previousLine || startTimeMs > parseInt(previousLine.startTimeMs)) {
                                    previousLine = line;
                                }
                            } else if (!upcomingLine || startTimeMs < parseInt(upcomingLine.startTimeMs)) {
                                upcomingLine = line;
                            }

                            if (timeDifference < closestTimeDifference) {
                                closestTimeDifference = timeDifference;
                                closestLine = line;
                            }
                        }

                        if (closestLine) {
                            setNextLine(closestLine.words);
                            translateLine(closestLine.words, setTranslatedLyrics);
                        } else {
                            setLyrics("No lyrics found for the current time.");
                            setTranslatedLyrics("");
                        }

                        if (previousLine) {
                            setPreviousLine(previousLine.words);
                            translateLine(previousLine.words, setTranslatedPreviousLine);
                        } else {
                            setTranslatedPreviousLine("");
                        }

                        if (upcomingLine) {
                            setUpcomingLine(upcomingLine.words);
                            translateLine(upcomingLine.words, setTranslatedUpcomingLine);
                        } else {
                            setTranslatedUpcomingLine("");
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching lyrics:', error);
                });
        }
    }, [props.trackUri, props.currentTime]);

    const translateLine = (line, setStateFunction) => {
        const deepLApiURL = 'http://localhost:5000/translate';

        const translationRequest = {
            text: line,
            targetLang: 'EN', // Replace with your target language code
        };

        fetch(deepLApiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(translationRequest),
        })
            .then((response) => response.json())
            .then((data) => {
                setStateFunction(data.translatedText);
            })
            .catch((error) => {
                console.error('Error fetching and translating lyrics:', error);
            });
    };

    useEffect(() => {
        if (nextLine) {
            setLyrics(nextLine);
        }
    }, [nextLine]);

    return (
        <div className="lyrics">
            <div className='lyrics-text'>
                <p className='previous'>{previousLine}</p>
                <p className="translated-previous">{translatedPreviousLine}</p>
                {/* <p className="current">{currentLine }</p> */}
                <p className="upcoming">{upcomingLine}</p>  
                <p className="translated-upcoming">{translatedUpcomingLine}</p>          
            </div>
        </div>
    );
}

export default Lyrics;