import React from 'react';
import Table from '../common/Table';
import { formatPhone } from '../../utils/helpers';

const ClientList = ({ clients, onEdit }) => {
  const columns = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    {
      key: 'telephone',
      label: 'Téléphone',
      render: (client) => formatPhone(client.telephone)
    },
    { key: 'email', label: 'Email' },
    { key: 'ville', label: 'Ville' },
    {
      key: 'actions',
      label: 'Actions',
      render: (client) => (
        <button className="btn btn-sm btn-primary" onClick={(e) => { e.stopPropagation(); onEdit(client); }}>
          Modifier
        </button>
      )
    }
  ];

  return <Table columns={columns} data={clients} onRowClick={onEdit} />;
};

export default ClientList;
