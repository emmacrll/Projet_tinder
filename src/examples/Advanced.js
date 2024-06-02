import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';

function Advanced() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/profiles');
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des profils:', error);
      }
    };

    fetchProfiles();
  }, []);

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    setCurrentIndex(index + 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`);
  };

  const canGoBack = currentIndex > 0;
  const canSwipe = currentIndex < profiles.length;

  const swipe = (dir) => {
    if (canSwipe) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goBack = () => {
    if (canGoBack) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {profiles.map((profile, index) => (
          <TinderCard
            className='swipe'
            key={profile.first_name}
            onSwipe={(dir) => swiped(dir, profile.first_name, index)}
            onCardLeftScreen={() => outOfFrame(profile.first_name, index)}
          >
            <div
              style={{ backgroundImage: `url(${profile.photo})` }}
              className='card'
            >
              <h3>{profile.first_name}</h3>
              <p>{profile.description}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={goBack}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection && (
        <h2 className='infoText'>You swiped {lastDirection}</h2>
      )}
    </div>
  );
}

export default Advanced;
