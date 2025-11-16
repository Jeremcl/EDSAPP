import React from 'react';
import Table from '../common/Table';
import { formatDate, formatCurrency, getStatutBadgeClass } from '../../utils/helpers';

const InterventionList = ({ interventions }) => {
  const columns = [
    { key: 'numero', label: 'Numéro' },
    {
      key: 'client',
      label: 'Client',
      render: (intervention) => intervention.clientId ? `${intervention.clientId.prenom} ${intervention.clientId.nom}` : '-'
    },
    { key: 'description', label: 'Description' },
    {
      key: 'statut',
      label: 'Statut',
      render: (intervention) => (
        <span className={getStatutBadgeClass(intervention.statut)}>
          {intervention.statut}
        </span>
      )
    },
    {
      key: 'datePrevue',
      label: 'Date prévue',
      render: (intervention) => formatDate(intervention.datePrevue)
    },
    {
      key: 'coutTotal',
      label: 'Coût',
      render: (intervention) => formatCurrency(intervention.coutTotal)
    }
  ];

  return <Table columns={columns} data={interventions} />;
};

export default InterventionList;
