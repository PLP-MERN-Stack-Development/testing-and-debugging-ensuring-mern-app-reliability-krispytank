import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import * as api from './api/api';

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.fetchBugs();
      setBugs(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (payload) => {
    const created = await api.createBug(payload);
    setBugs(prev => [created, ...prev]);
  };

  const handleUpdate = async (id, payload) => {
    const updated = await api.updateBug(id, payload);
    setBugs(prev => prev.map(b => (b._id === id ? updated : b)));
  };

  const handleDelete = async (id) => {
    await api.deleteBug(id);
    setBugs(prev => prev.filter(b => b._id !== id));
  };

  return (
    <ErrorBoundary>
      <div>
        <h1>Bug Tracker</h1>
        <BugForm onCreated={handleCreate} />
        {loading && <div>Loading...</div>}
        {error && <div role="alert">{error}</div>}
        <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </ErrorBoundary>
  );
}
