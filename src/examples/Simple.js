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
            onSwipe={(dir) => swiped(dir, profile.name)}
            onCardLeftScreen={() => outOfFrame(profile.name)}
          >
            <div className='card'>
              <div
                style={{ backgroundImage: `url(${profile.picture})` }}
                className='cardImage'
              />
              <div className='cardContent'>
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>
                <p>Hobbies: {profile.hobbies.join(', ')}</p>
              </div>
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
