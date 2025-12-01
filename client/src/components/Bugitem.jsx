import React from 'react';

export default function BugItem({ bug, onUpdate, onDelete }) {
  const changeStatus = () => {
    const next = bug.status === 'open' ? 'in-progress' : bug.status === 'in-progress' ? 'resolved' : 'open';
    onUpdate(bug._id, { ...bug, status: next });
  };

  return (
    <li>
      <h4>{bug.title}</h4>
      <p>{bug.description}</p>
      <small>Status: {bug.status}</small>
      <div>
        <button onClick={changeStatus}>Toggle Status</button>
        <button onClick={() => onDelete(bug._id)}>Delete</button>
      </div>
    </li>
  );
}
