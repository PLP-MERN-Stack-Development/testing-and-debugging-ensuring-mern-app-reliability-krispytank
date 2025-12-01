import React from 'react';
import BugItem from './BugItem';

export default function BugList({ bugs, onUpdate, onDelete }) {
  if (!bugs || bugs.length === 0) return <div>No bugs reported yet</div>;
  return (
    <ul>
      {bugs.map(b => <BugItem key={b._id} bug={b} onUpdate={onUpdate} onDelete={onDelete} />)}
    </ul>
  );
}
