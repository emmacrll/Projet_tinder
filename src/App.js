import React, { useState, useEffect } from 'react';
import './App.css';
import Switch from 'react-ios-switch';
import Advanced from './examples/Advanced'; // Assurez-vous que le chemin est correct
import Simple from './examples/Simple'; // Assurez-vous que le chemin est correct

function App() {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/profiles');
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des profils:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className='app'>
      {showAdvanced ? <Advanced profiles={profiles} /> : <Simple profiles={profiles} />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
      </div>
    </div>
  );
}

export default App;
