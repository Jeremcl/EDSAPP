import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { interventionsAPI, piecesAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, alertesRes] = await Promise.all([
        interventionsAPI.getDashboardStats(),
        piecesAPI.getAlertes()
      ]);
      setStats(statsRes.data);
      setAlertes(alertesRes.data);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div>Chargement...</div></Layout>;

  return (
    <Layout>
      <h1>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3>Interventions aujourd'hui</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            {stats?.interventionsAujourdhui || 0}
          </p>
        </div>
        <div className="card">
          <h3>Interventions en cours</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--statut-encours)' }}>
            {stats?.interventionsEnCours || 0}
          </p>
        </div>
        <div className="card">
          <h3>Terminées cette semaine</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--statut-termine)' }}>
            {stats?.interventionsTerminesSemaine || 0}
          </p>
        </div>
        <div className="card">
          <h3>CA du mois</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>
            {formatCurrency(stats?.chiffreAffairesMois || 0)}
          </p>
        </div>
      </div>

      {alertes.length > 0 && (
        <div className="card">
          <h2>Alertes Stock Bas</h2>
          <div className="alert alert-warning">
            <strong>{alertes.length}</strong> pièce(s) avec un stock bas
          </div>
          <ul>
            {alertes.slice(0, 5).map((piece) => (
              <li key={piece._id}>
                {piece.designation} - Stock: {piece.quantiteStock} (Minimum: {piece.quantiteMinimum})
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;
