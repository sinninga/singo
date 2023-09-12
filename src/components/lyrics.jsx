import React, { useState, useEffect } from 'react';
import '../styles/lyrics.css';
import '../styles/lyricsAnimation.css';


function Lyrics(props) {
  const [lyricsData, setLyricsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [translations, setTranslations] = useState({
    current: '',
    previous: '',
    upcoming: '',
  });

  useEffect(() => {
    if (!props.trackUri) {
      return;
    }

    const trackId = props.trackUri.split(':').pop();
    const apiURL = `https://spotify-lyric-api.herokuapp.com/?url=https://open.spotify.com/track/${trackId}`;

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && data.lines) {
          setLyricsData(data.lines);
        }
      })
      .catch(error => {
        console.error('Error fetching lyrics:', error);
      });
  }, [props.trackUri]);

  useEffect(() => {
    if (lyricsData.length === 0) {
      return;
    }

    const currentTimeInMilliseconds = props.currentTime * 1000;

    // Find the index of the current lyric based on its start time
    for (let i = 0; i < lyricsData.length; i++) {
      const startTimeMs = parseInt(lyricsData[i].startTimeMs);
      const endTimeMs = i < lyricsData.length - 1
        ? parseInt(lyricsData[i + 1].startTimeMs)
        : Number.MAX_SAFE_INTEGER;

      if (startTimeMs <= currentTimeInMilliseconds && currentTimeInMilliseconds < endTimeMs) {
        setCurrentIndex(i);
        break;
      }
    }
  }, [props.currentTime, lyricsData]);

  useEffect(() => {
    if (currentIndex >= 0) {
      // Fetch translations using Deepl API for the current, previous, and upcoming lines
      const currentLine = lyricsData[currentIndex].words;
    //   const previousLine = lyricsData[currentIndex - 1]?.words;
    //   const upcomingLine = lyricsData[currentIndex + 1]?.words;

      const fetchTranslations = async () => {
        const currentTranslation = await fetchTranslation(currentLine);
        // const previousTranslation = await fetchTranslation(previousLine);
        // const upcomingTranslation = await fetchTranslation(upcomingLine);

        setTranslations({
          current: currentTranslation || '',
        //   previous: previousTranslation || '',
        //   upcoming: upcomingTranslation || '',
        });
      };

      fetchTranslations();
    }
  }, [currentIndex, lyricsData]);

  const fetchTranslation = async (text) => {
    const deepLApiURL = 'http://localhost:5000/translate';

    const translationRequest = {
      text,
      targetLang: 'EN', // Replace with your target language code
    };

    try {
      const response = await fetch(deepLApiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(translationRequest),
      });

      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Error fetching and translating lyrics:', error);
      return ''; // Return an empty string if translation fails
    }
  };

  return (
    <div className="lyrics">
      <div className={`lyrics-text ${currentIndex === -1 ? 'intro-animation' : ''}`}>
        {currentIndex >= 0 && (
          <>
            {/* <p className='previous'>{lyricsData[currentIndex - 1]?.words}</p>
            <p className="translated-previous">{translations.previous}</p> */}
            <p className="current">{lyricsData[currentIndex]?.words}</p>
            <p className="translated-current">{translations.current}</p>
            {/* <p className="upcoming">{lyricsData[currentIndex + 1]?.words}</p>
            <p className="translated-upcoming">{translations.upcoming}</p> */}
          </>
        )}
      </div>
      {currentIndex === -1 && (
      <div className="animation-container">
        <div className="simple-shape one"></div>
        <div className="simple-shape two"></div>
        <div className="simple-shape three"></div>
        <div className="simple-shape four"></div>
      </div>
      )}
    </div>
  );
}

export default Lyrics;
