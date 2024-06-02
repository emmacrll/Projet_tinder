import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';

function Simple() {
  const [profiles, setProfiles] = useState([]);
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

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {profiles.map((profile) => (
          <TinderCard
            className='swipe'
            key={profile.id}
            onSwipe={(dir) => swiped(dir, profile.first_name)}
            onCardLeftScreen={() => outOfFrame(profile.first_name)}
          >
            <div
              style={{ backgroundImage: `url(${profile.photo})` }}
              className='card'
            >
              <h3>{profile.first_name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection && (
        <h2 className='infoText'>You swiped {lastDirection}</h2>
      )}
    </div>
  );
}

export default Simple;
