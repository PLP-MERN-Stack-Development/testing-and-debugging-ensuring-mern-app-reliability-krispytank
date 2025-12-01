import React, { useState } from 'react';

export default function BugForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title required');
      return;
    }
    try {
      // intentionally not awaiting to create a debugging scenario in practice (we'll mark intentional bugs elsewhere)
      const payload = { title, description };
      await onCreated(payload); // parent handles API call
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Failed to create bug');
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="bug-form">
      <div>
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} />
      </div>
      {error && <div role="alert">{error}</div>}
      <button type="submit">Report Bug</button>
    </form>
  );
}
