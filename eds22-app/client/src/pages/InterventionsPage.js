import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import InterventionList from '../components/interventions/InterventionList';
import Button from '../components/common/Button';
import { interventionsAPI } from '../services/api';

const InterventionsPage = () => {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    try {
      const response = await interventionsAPI.getAll();
      setInterventions(response.data.interventions);
    } catch (error) {
      console.error('Erreur chargement interventions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div>Chargement...</div></Layout>;

  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Interventions</h1>
          <Button>Nouvelle intervention</Button>
        </div>
        <InterventionList interventions={interventions} />
      </div>
    </Layout>
  );
};

export default InterventionsPage;
