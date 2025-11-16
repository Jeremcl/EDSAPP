import React from 'react';
import Table from '../common/Table';
import { formatCurrency } from '../../utils/helpers';

const StockList = ({ pieces }) => {
  const columns = [
    { key: 'reference', label: 'Référence' },
    { key: 'designation', label: 'Désignation' },
    { key: 'marque', label: 'Marque' },
    { key: 'categorie', label: 'Catégorie' },
    { key: 'emplacement', label: 'Emplacement' },
    {
      key: 'quantiteStock',
      label: 'Stock',
      render: (piece) => (
        <span style={{ color: piece.quantiteStock <= piece.quantiteMinimum ? 'var(--danger)' : 'inherit' }}>
          {piece.quantiteStock}
        </span>
      )
    },
    {
      key: 'prixVente',
      label: 'Prix vente',
      render: (piece) => formatCurrency(piece.prixVente)
    }
  ];

  return <Table columns={columns} data={pieces} />;
};

export default StockList;
