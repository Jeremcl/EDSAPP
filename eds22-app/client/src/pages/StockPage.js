import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import StockList from '../components/stock/StockList';
import Button from '../components/common/Button';
import { piecesAPI } from '../services/api';

const StockPage = () => {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPieces();
  }, []);

  const fetchPieces = async () => {
    try {
      const response = await piecesAPI.getAll();
      setPieces(response.data.pieces);
    } catch (error) {
      console.error('Erreur chargement pièces:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div>Chargement...</div></Layout>;

  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Stock de Pièces</h1>
          <Button>Ajouter une pièce</Button>
        </div>
        <StockList pieces={pieces} />
      </div>
    </Layout>
  );
};

export default StockPage;
