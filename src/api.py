# app.py
import random
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Liste des hobbies possibles
hobbies_list = ['Lecture', 'Voyage', 'Musique', 'Sport', 'Cuisine', 'Photographie', 'Peinture', 'Jardinage', 'Cinéma', 'Danse']

@app.route('/profiles')
def get_profiles():
    try:
        # Récupération des profils depuis l'API randomuser
        response = requests.get('https://randomuser.me/api/?results=10')
        data = response.json()['results']
        
        # Transformation des données des profils
        profiles = [{
            'id': idx,
            'nom': f"{profile['name']['first']} {profile['name']['last']}",
            'photo': profile['picture']['large'],
            'description': f"{profile['name']['first']} a {profile['dob']['age']} ans et vient de {profile['location']['city']}.",
            'hobbies': random.sample(hobbies_list, 2)  # Sélection aléatoire de 2 hobbies
        } for idx, profile in enumerate(data)]
        
        return jsonify(profiles)
    except Exception as e:
        return jsonify({'erreur': str(e)}), 500

@app.route('/profiles/like', methods=['POST'])
def like_profile():
    try:
        data = request.get_json()
        profile_id = data.get('profileId')
        liked = data.get('liked')
        
        # Traitement de l'action like/dislike, par exemple mise à jour de la base de données
        # Pour simplifier, nous n'implémentons pas cette logique ici
        
        return jsonify({'message': f'Profil {profile_id} {"aimé" if liked else "pas aimé"} avec succès.'})
    except Exception as e:
        return jsonify({'erreur': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
