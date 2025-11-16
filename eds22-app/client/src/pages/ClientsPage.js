import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import ClientList from '../components/clients/ClientList';
import ClientForm from '../components/clients/ClientForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { clientsAPI } from '../services/api';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getAll();
      setClients(response.data.clients);
    } catch (error) {
      console.error('Erreur chargement clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedClient(null);
    setShowModal(true);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleSave = async () => {
    await fetchClients();
    setShowModal(false);
  };

  if (loading) return <Layout><div>Chargement...</div></Layout>;

  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Clients</h1>
          <Button onClick={handleAdd}>Nouveau client</Button>
        </div>
        <ClientList clients={clients} onEdit={handleEdit} />
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedClient ? 'Modifier client' : 'Nouveau client'}
        size="lg"
      >
        <ClientForm
          client={selectedClient}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </Layout>
  );
};

export default ClientsPage;
