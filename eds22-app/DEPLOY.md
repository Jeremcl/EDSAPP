# Guide de Déploiement EDS22

## 📋 Prérequis

1. Compte GitHub (le code doit être sur GitHub)
2. Compte MongoDB Atlas (gratuit) - https://www.mongodb.com/cloud/atlas
3. Compte Render.com (gratuit) - https://render.com

## 🗄️ Étape 1 : Configurer MongoDB Atlas (Base de données)

1. Créer un compte sur https://www.mongodb.com/cloud/atlas
2. Créer un nouveau cluster (choisir le plan GRATUIT)
3. Dans "Database Access", créer un utilisateur avec mot de passe
4. Dans "Network Access", ajouter `0.0.0.0/0` (accès depuis partout)
5. Cliquer sur "Connect" → "Connect your application"
6. Copier l'URI de connexion, ressemblera à :
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eds22?retryWrites=true&w=majority
   ```
7. **Remplacer** `<password>` par votre vrai mot de passe

## 🚀 Étape 2 : Déployer sur Render.com

### Option A : Déploiement automatique avec render.yaml (RECOMMANDÉ)

1. Aller sur https://render.com et se connecter
2. Cliquer sur "New +" → "Blueprint"
3. Connecter votre dépôt GitHub contenant EDS22
4. Render détectera automatiquement le fichier `render.yaml`
5. Configurer les variables d'environnement :
   - `MONGODB_URI` : Coller l'URI MongoDB Atlas de l'étape 1
6. Cliquer sur "Apply"
7. Attendre le déploiement (5-10 minutes)

### Option B : Déploiement manuel

#### Backend

1. Sur Render, cliquer "New +" → "Web Service"
2. Connecter le dépôt GitHub
3. Configurer :
   - **Name** : `eds22-backend`
   - **Region** : Europe (Frankfurt)
   - **Branch** : `claude/create-eds22-app-01Dd95JPYfZt2VQshohocvug`
   - **Root Directory** : `eds22-app/server`
   - **Environment** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
4. Variables d'environnement :
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `votre_uri_mongodb_atlas`
   - `JWT_SECRET` = `un_secret_aleatoire_tres_long`
   - `JWT_EXPIRE` = `7d`
5. Cliquer "Create Web Service"
6. **Noter l'URL** (ex: https://eds22-backend.onrender.com)

#### Frontend

1. Sur Render, cliquer "New +" → "Static Site"
2. Connecter le même dépôt
3. Configurer :
   - **Name** : `eds22-frontend`
   - **Branch** : `claude/create-eds22-app-01Dd95JPYfZt2VQshohocvug`
   - **Root Directory** : `eds22-app/client`
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `build`
4. Variables d'environnement :
   - `REACT_APP_API_URL` = `https://eds22-backend.onrender.com/api`
5. Cliquer "Create Static Site"

## 🔧 Étape 3 : Mettre à jour le code pour la production

### Modifier le fichier client/src/services/api.js

Remplacer la ligne 3 par :
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Modifier server/server.js - Ajouter configuration CORS

Après la ligne `const app = express();`, ajouter :
```javascript
// Configuration CORS pour production
const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  credentials: true
};
app.use(cors(corsOptions));
```

## 📊 Étape 4 : Générer les données de test

Une fois le backend déployé, générer les données :

1. Dans Render Dashboard → Backend service → "Shell"
2. Exécuter : `npm run seed`

Ou créer un script de démarrage qui fait le seed automatiquement au premier lancement.

## ✅ Étape 5 : Tester l'application

1. Aller sur l'URL du frontend (ex: https://eds22-frontend.onrender.com)
2. Se connecter avec :
   - Email : `admin@eds22.com`
   - Mot de passe : `password123`

## 🐛 Dépannage

### Erreur CORS
- Vérifier que `CLIENT_URL` dans le backend pointe vers l'URL du frontend
- Vérifier la configuration CORS dans `server.js`

### Base de données non connectée
- Vérifier l'URI MongoDB Atlas
- Vérifier que l'IP `0.0.0.0/0` est autorisée dans MongoDB Atlas
- Vérifier les logs du backend sur Render

### Frontend ne se connecte pas au backend
- Vérifier que `REACT_APP_API_URL` pointe vers le bon backend
- Rebuild le frontend après avoir changé les variables d'environnement

## 🔄 Déploiement continu

Render redéploie automatiquement à chaque push sur la branche configurée.

## 💰 Coûts

- **MongoDB Atlas** : Gratuit (512MB)
- **Render.com** : Gratuit avec limitations :
  - Le service s'endort après 15 min d'inactivité
  - Redémarre au premier accès (peut prendre 30s)
  - 750h/mois gratuites

## 🚀 Alternative : Railway.app

Si vous préférez Railway :

1. Aller sur https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Sélectionner le dépôt
4. Railway détectera automatiquement Node.js
5. Ajouter un service MongoDB
6. Configurer les variables d'environnement
7. Déployer !

Railway est souvent plus simple mais avec un plan gratuit plus limité.
