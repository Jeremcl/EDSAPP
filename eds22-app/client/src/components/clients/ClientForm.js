import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { clientsAPI } from '../../services/api';

const ClientForm = ({ client, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    codePostal: '',
    ville: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (client) {
      setFormData(client);
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (client) {
        await clientsAPI.update(client._id, formData);
      } else {
        await clientsAPI.create(formData);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
        <Input label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input label="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} required />
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>

      <Input label="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
        <Input label="Code Postal" name="codePostal" value={formData.codePostal} onChange={handleChange} />
        <Input label="Ville" name="ville" value={formData.ville} onChange={handleChange} />
      </div>

      <Input label="Notes" type="textarea" name="notes" value={formData.notes} onChange={handleChange} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
