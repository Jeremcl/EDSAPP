# EDS22 - Application de Gestion

Application complète de gestion pour EDS22 - Électro Dépannage Service

## 🏢 À propos

EDS22 est une application de gestion pour un service de réparation, vente et location d'appareils électroménagers et électroniques. L'application permet de gérer :
- Les clients et leur historique
- Les interventions (réparations, diagnostics)
- Le stock de pièces détachées
- La facturation et les garanties

## 📋 Fonctionnalités

### Dashboard
- Vue d'ensemble des interventions du jour
- Statistiques en temps réel
- Alertes de stock bas
- Chiffre d'affaires du mois

### Gestion des Clients
- Création et modification de fiches clients
- Historique des appareils
- Notes et coordonnées complètes
- Export CSV

### Gestion des Interventions
- Création d'interventions avec workflow complet
- Statuts : Demande → Planifié → En cours → Diagnostic → Réparation → Terminé → Facturé
- Calcul automatique des coûts (pièces + main d'œuvre + forfait)
- Gestion des garanties (3 mois sur réparations)
- Forfaits : 59€ atelier, 99€ domicile

### Gestion du Stock
- Inventaire des pièces détachées
- Alertes stock bas
- Historique des mouvements
- Localisation par emplacement

## 🚀 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- MongoDB (v5 ou supérieur)
- npm ou yarn

### Installation des dépendances

```bash
# À la racine du projet
npm run install-all
```

Ou manuellement :

```bash
# Dépendances racine
npm install

# Dépendances serveur
cd server && npm install

# Dépendances client
cd ../client && npm install
```

### Configuration

1. **MongoDB** : Assurez-vous que MongoDB est installé et en cours d'exécution sur `localhost:27017`

2. **Variables d'environnement** : Le fichier `.env` est déjà configuré dans `server/.env` avec :
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eds22
   JWT_SECRET=eds22_secret_key_2025
   JWT_EXPIRE=7d
   ```

### Génération des données de test

```bash
cd server
npm run seed
```

Ceci créera :
- 3 utilisateurs (admin@eds22.com, jean@eds22.com, sophie@eds22.com)
- 10 clients
- 10 pièces détachées
- 5 interventions

## 🎯 Démarrage

### Démarrage complet (serveur + client)

```bash
# À la racine du projet
npm run dev
```

Ceci démarre :
- **Backend** : http://localhost:5000
- **Frontend** : http://localhost:3000

### Démarrage séparé

**Serveur uniquement :**
```bash
cd server
npm run dev
```

**Client uniquement :**
```bash
cd client
npm start
```

## 🔐 Connexion

### Identifiants par défaut

- **Email** : `admin@eds22.com`
- **Mot de passe** : `password123`
- **Rôle** : Admin

Autres utilisateurs :
- `jean@eds22.com` / `password123` (Technicien)
- `sophie@eds22.com` / `password123` (Technicien)

## 📁 Structure du Projet

```
eds22-app/
├── client/                 # Application React
│   ├── public/
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── pages/         # Pages de l'application
│   │   ├── services/      # Services API
│   │   ├── styles/        # Fichiers CSS
│   │   ├── utils/         # Utilitaires et constantes
│   │   └── assets/        # Images et logo
│   └── package.json
├── server/                # API Node.js/Express
│   ├── models/           # Modèles MongoDB
│   ├── controllers/      # Logique métier
│   ├── routes/           # Routes API
│   ├── middleware/       # Middlewares (auth, validation)
│   ├── utils/            # Utilitaires serveur
│   ├── config/           # Configuration
│   └── package.json
└── package.json          # Configuration racine
```

## 🎨 Design System

### Couleurs

- **Primaire** : #2D5A3D (Vert EDS22)
- **Statuts** :
  - Demande : Bleu (#3B82F6)
  - Planifié : Jaune (#EAB308)
  - En cours : Orange (#F97316)
  - Diagnostic : Violet (#A855F7)
  - Réparation : Rouge (#EF4444)
  - Terminé : Vert (#22C55E)
  - Facturé : Gris (#94A3B8)

## 🔧 Technologies Utilisées

### Frontend
- React 18
- React Router 6
- Axios
- date-fns

### Backend
- Node.js
- Express
- MongoDB avec Mongoose
- JWT pour l'authentification
- bcryptjs pour le hachage des mots de passe

## 📊 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur
- `GET /api/auth/users` - Liste utilisateurs
- `POST /api/auth/users` - Créer utilisateur (Admin)

### Clients
- `GET /api/clients` - Liste des clients
- `POST /api/clients` - Créer un client
- `GET /api/clients/:id` - Détail d'un client
- `PUT /api/clients/:id` - Modifier un client
- `DELETE /api/clients/:id` - Supprimer un client
- `GET /api/clients/export` - Exporter en CSV

### Interventions
- `GET /api/interventions` - Liste des interventions
- `POST /api/interventions` - Créer une intervention
- `GET /api/interventions/:id` - Détail d'une intervention
- `PUT /api/interventions/:id` - Modifier une intervention
- `DELETE /api/interventions/:id` - Supprimer une intervention
- `POST /api/interventions/:id/pieces` - Ajouter une pièce
- `GET /api/interventions/dashboard-stats` - Statistiques

### Pièces
- `GET /api/pieces` - Liste des pièces
- `POST /api/pieces` - Créer une pièce
- `GET /api/pieces/:id` - Détail d'une pièce
- `PUT /api/pieces/:id` - Modifier une pièce
- `DELETE /api/pieces/:id` - Supprimer une pièce
- `POST /api/pieces/:id/ajuster-stock` - Ajuster le stock
- `GET /api/pieces/mouvements` - Historique mouvements
- `GET /api/pieces/alertes` - Alertes stock bas

## 🛠 Développement

### Scripts disponibles

```bash
# Racine
npm run dev          # Démarrer serveur + client
npm run install-all  # Installer toutes les dépendances

# Serveur
npm run dev          # Mode développement avec nodemon
npm run seed         # Générer données de test

# Client
npm start            # Démarrer le serveur de dev
npm run build        # Build pour production
```

## 📝 Notes Importantes

### Garanties
- Réparations : 3 mois
- Appareils vendus : 6 mois

### Forfaits
- Dépôt atelier : 59€
- Enlèvement domicile : 99€
- Main d'œuvre : 45€/heure

### Workflow Intervention
1. **Demande** : Nouvelle demande client
2. **Planifié** : Date et technicien assignés
3. **En cours** : Intervention démarrée
4. **Diagnostic** : Analyse du problème
5. **Réparation** : Réparation en cours
6. **Terminé** : Travail fini
7. **Facturé** : Intervention facturée

## 🐛 Dépannage

### MongoDB ne démarre pas
```bash
# Vérifier le statut
sudo systemctl status mongod

# Démarrer MongoDB
sudo systemctl start mongod
```

### Port déjà utilisé
Si le port 5000 ou 3000 est déjà utilisé, modifiez dans :
- Serveur : `server/.env` → `PORT=5001`
- Client : La variable d'environnement React

### Erreur de connexion à l'API
Vérifiez que :
1. MongoDB est démarré
2. Le serveur backend est lancé sur le port 5000
3. Le proxy dans `client/package.json` pointe vers http://localhost:5000

## 📞 Support

Pour toute question ou problème, contactez l'équipe EDS22.

---

**EDS22** - Électro Dépannage Service
Version 1.0.0 - 2025
