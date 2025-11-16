const Client = require('../models/Client');

// Obtenir tous les clients
exports.getClients = async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { prenom: { $regex: search, $options: 'i' } },
        { telephone: { $regex: search, $options: 'i' } },
        { ville: { $regex: search, $options: 'i' } }
      ];
    }

    const clients = await Client.find(query)
      .sort({ dateCreation: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Client.countDocuments(query);

    res.json({
      clients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un client par ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau client
exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    const nouveauClient = await client.save();
    res.status(201).json(nouveauClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporter les clients en CSV
exports.exportClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ nom: 1 });

    let csv = 'Nom,Prénom,Téléphone,Email,Adresse,Code Postal,Ville\n';
    clients.forEach(client => {
      csv += `${client.nom},${client.prenom},${client.telephone},${client.email || ''},${client.adresse || ''},${client.codePostal || ''},${client.ville || ''}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=clients.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
