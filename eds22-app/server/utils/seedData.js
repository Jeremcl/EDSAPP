const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Client = require('../models/Client');
const Intervention = require('../models/Intervention');
const Piece = require('../models/Piece');
const config = require('../config/config');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Erreur connexion MongoDB:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  await User.deleteMany({});

  const users = [
    {
      nom: 'Admin',
      prenom: 'EDS22',
      email: 'admin@eds22.com',
      motDePasse: 'password123',
      role: 'Admin'
    },
    {
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean@eds22.com',
      motDePasse: 'password123',
      role: 'Technicien'
    },
    {
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie@eds22.com',
      motDePasse: 'password123',
      role: 'Technicien'
    }
  ];

  await User.insertMany(users);
  console.log('✓ Utilisateurs créés');
};

const seedClients = async () => {
  await Client.deleteMany({});

  const clients = [
    {
      nom: 'Dupont',
      prenom: 'Marie',
      telephone: '0296445566',
      email: 'marie.dupont@email.com',
      adresse: '15 rue de la Paix',
      codePostal: '22200',
      ville: 'Guingamp',
      appareils: [{ type: 'Lave-linge', marque: 'Whirlpool', modele: 'AWO-1234' }]
    },
    {
      nom: 'Le Gall',
      prenom: 'Pierre',
      telephone: '0296556677',
      email: 'pierre.legall@email.com',
      adresse: '28 avenue de Bretagne',
      codePostal: '22200',
      ville: 'Guingamp',
      appareils: [{ type: 'Lave-vaisselle', marque: 'Bosch', modele: 'SMV-5000' }]
    },
    {
      nom: 'Morvan',
      prenom: 'Anne',
      telephone: '0296667788',
      email: 'anne.morvan@email.com',
      adresse: '42 rue du Port',
      codePostal: '22500',
      ville: 'Paimpol'
    },
    {
      nom: 'Quéré',
      prenom: 'François',
      telephone: '0296778899',
      adresse: '7 place de l\'Église',
      codePostal: '22300',
      ville: 'Lannion'
    },
    {
      nom: 'Le Bihan',
      prenom: 'Catherine',
      telephone: '0296889900',
      email: 'catherine.lebihan@email.com',
      adresse: '33 rue des Korrigans',
      codePostal: '22000',
      ville: 'Saint-Brieuc',
      appareils: [{ type: 'Réfrigérateur', marque: 'Samsung', modele: 'RF-4500' }]
    },
    {
      nom: 'Tanguy',
      prenom: 'Marc',
      telephone: '0296990011',
      adresse: '18 impasse des Lilas',
      codePostal: '22200',
      ville: 'Guingamp'
    },
    {
      nom: 'Kergoat',
      prenom: 'Nathalie',
      telephone: '0296001122',
      email: 'nathalie.kergoat@email.com',
      adresse: '5 rue de la Mer',
      codePostal: '22560',
      ville: 'Pleumeur-Bodou'
    },
    {
      nom: 'Le Goff',
      prenom: 'Yves',
      telephone: '0296112233',
      adresse: '21 avenue du Général de Gaulle',
      codePostal: '22200',
      ville: 'Guingamp',
      appareils: [{ type: 'Four', marque: 'Electrolux', modele: 'EOB-3400' }]
    },
    {
      nom: 'Prigent',
      prenom: 'Isabelle',
      telephone: '0296223344',
      email: 'isabelle.prigent@email.com',
      adresse: '9 rue des Ajoncs',
      codePostal: '22740',
      ville: 'Lézardrieux'
    },
    {
      nom: 'Le Roux',
      prenom: 'Alain',
      telephone: '0296334455',
      adresse: '14 chemin des Douaniers',
      codePostal: '22430',
      ville: 'Erquy'
    }
  ];

  const createdClients = await Client.insertMany(clients);
  console.log('✓ Clients créés');
  return createdClients;
};

const seedPieces = async () => {
  await Piece.deleteMany({});

  const pieces = [
    {
      reference: 'FIL-001',
      designation: 'Filtre à peluches lave-linge',
      marque: 'Whirlpool',
      categorie: 'Filtre',
      emplacement: 'A1-B2',
      quantiteStock: 15,
      quantiteMinimum: 5,
      prixAchat: 12.50,
      prixVente: 25.00
    },
    {
      reference: 'PMP-002',
      designation: 'Pompe de vidange universelle',
      marque: 'Bosch',
      categorie: 'Pompe',
      emplacement: 'A2-C1',
      quantiteStock: 8,
      quantiteMinimum: 3,
      prixAchat: 35.00,
      prixVente: 65.00
    },
    {
      reference: 'RES-003',
      designation: 'Résistance lave-vaisselle 2000W',
      marque: 'Divers',
      categorie: 'Résistance',
      emplacement: 'B1-A3',
      quantiteStock: 4,
      quantiteMinimum: 5,
      prixAchat: 28.00,
      prixVente: 55.00
    },
    {
      reference: 'JNT-004',
      designation: 'Joint de porte lave-linge',
      marque: 'Whirlpool',
      categorie: 'Joint',
      emplacement: 'A3-B1',
      quantiteStock: 12,
      quantiteMinimum: 4,
      prixAchat: 18.00,
      prixVente: 35.00
    },
    {
      reference: 'CRR-005',
      designation: 'Courroie pour lave-linge 1270mm',
      marque: 'Divers',
      categorie: 'Courroie',
      emplacement: 'B2-C2',
      quantiteStock: 20,
      quantiteMinimum: 8,
      prixAchat: 8.50,
      prixVente: 18.00
    },
    {
      reference: 'MTR-006',
      designation: 'Moteur lave-linge 500W',
      marque: 'Candy',
      categorie: 'Moteur',
      emplacement: 'C1-D1',
      quantiteStock: 3,
      quantiteMinimum: 2,
      prixAchat: 85.00,
      prixVente: 150.00
    },
    {
      reference: 'CRT-007',
      designation: 'Carte électronique lave-vaisselle',
      marque: 'Bosch',
      categorie: 'Carte électronique',
      emplacement: 'D1-A1',
      quantiteStock: 2,
      quantiteMinimum: 3,
      prixAchat: 120.00,
      prixVente: 220.00
    },
    {
      reference: 'THM-008',
      designation: 'Thermostat four 300°C',
      marque: 'Electrolux',
      categorie: 'Thermostat',
      emplacement: 'A4-B3',
      quantiteStock: 6,
      quantiteMinimum: 3,
      prixAchat: 22.00,
      prixVente: 42.00
    },
    {
      reference: 'FIL-009',
      designation: 'Filtre charbon hotte',
      marque: 'Divers',
      categorie: 'Filtre',
      emplacement: 'B3-C3',
      quantiteStock: 25,
      quantiteMinimum: 10,
      prixAchat: 5.00,
      prixVente: 12.00
    },
    {
      reference: 'BTN-010',
      designation: 'Bouton programmateur lave-linge',
      marque: 'Whirlpool',
      categorie: 'Bouton',
      emplacement: 'C3-D2',
      quantiteStock: 10,
      quantiteMinimum: 4,
      prixAchat: 6.50,
      prixVente: 15.00
    }
  ];

  const createdPieces = await Piece.insertMany(pieces);
  console.log('✓ Pièces créées');
  return createdPieces;
};

const seedInterventions = async (clients, pieces) => {
  await Intervention.deleteMany({});

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const interventions = [
    {
      clientId: clients[0]._id,
      appareil: { type: 'Lave-linge', marque: 'Whirlpool', modele: 'AWO-1234' },
      description: 'Lave-linge ne démarre plus',
      statut: 'En cours',
      priorite: 'Haute',
      datePrevue: today,
      technicien: 'Jean Dupont',
      typeIntervention: 'Domicile',
      forfaitApplique: 99
    },
    {
      clientId: clients[1]._id,
      appareil: { type: 'Lave-vaisselle', marque: 'Bosch', modele: 'SMV-5000' },
      description: 'Fuite d\'eau sous l\'appareil',
      statut: 'Planifié',
      priorite: 'Urgente',
      datePrevue: nextWeek,
      technicien: 'Sophie Martin',
      typeIntervention: 'Domicile',
      forfaitApplique: 99
    },
    {
      clientId: clients[2]._id,
      appareil: { type: 'Four', marque: 'Samsung', modele: 'NV70' },
      description: 'Four ne chauffe plus',
      statut: 'Demande',
      priorite: 'Normale',
      typeIntervention: 'Atelier',
      forfaitApplique: 59
    },
    {
      clientId: clients[3]._id,
      appareil: { type: 'Réfrigérateur', marque: 'LG', modele: 'GBB60' },
      description: 'Réfrigérateur fait du bruit',
      statut: 'Diagnostic',
      priorite: 'Basse',
      datePrevue: yesterday,
      technicien: 'Jean Dupont',
      typeIntervention: 'Atelier',
      forfaitApplique: 59
    },
    {
      clientId: clients[4]._id,
      appareil: { type: 'Lave-linge', marque: 'Samsung', modele: 'WW80' },
      description: 'Programme ne se termine pas',
      statut: 'Terminé',
      priorite: 'Normale',
      datePrevue: yesterday,
      dateRealisation: yesterday,
      technicien: 'Sophie Martin',
      diagnostic: 'Pompe de vidange défectueuse',
      solutionApportee: 'Remplacement de la pompe de vidange',
      piecesUtilisees: [
        {
          pieceId: pieces[1]._id,
          designation: pieces[1].designation,
          quantite: 1,
          prixUnitaire: pieces[1].prixVente
        }
      ],
      tempsMainOeuvre: 1.5,
      typeIntervention: 'Domicile',
      forfaitApplique: 99
    }
  ];

  await Intervention.insertMany(interventions);
  console.log('✓ Interventions créées');
};

const seedAll = async () => {
  try {
    await connectDB();

    console.log('\n🌱 Génération des données de test...\n');

    await seedUsers();
    const clients = await seedClients();
    const pieces = await seedPieces();
    await seedInterventions(clients, pieces);

    console.log('\n✅ Toutes les données de test ont été générées avec succès!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la génération des données:', error);
    process.exit(1);
  }
};

seedAll();
