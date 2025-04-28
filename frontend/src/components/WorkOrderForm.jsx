import { useState } from 'react';

function WorkOrderForm({ onAddWorkOrder }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(), // simple unique id
      title,
      description,
      status,
    };
    onAddWorkOrder(newOrder);
    // Clear form
    setTitle('');
    setDescription('');
    setStatus('Pending');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', textAlign: 'left', maxWidth: '600px', marginInline: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Add New Work Order</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', minHeight: '100px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          fontSize: '1rem',
        }}
      >
        Add Work Order
      </button>
    </form>
  );
}

export default WorkOrderForm;
