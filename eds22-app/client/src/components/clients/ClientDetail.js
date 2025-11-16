import React from 'react';

const ClientDetail = ({ client }) => {
  return (
    <div className="card">
      <h2>{client.prenom} {client.nom}</h2>
      <p>Téléphone: {client.telephone}</p>
      <p>Email: {client.email}</p>
      <p>Adresse: {client.adresse}, {client.codePostal} {client.ville}</p>
      {client.notes && <p>Notes: {client.notes}</p>}
    </div>
  );
};

export default ClientDetail;
