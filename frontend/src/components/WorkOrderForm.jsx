import { useState } from 'react';

function WorkOrderForm({ onAddWorkOrder }) {
  const [clientName, setClientName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      client_name: clientName,
      job_description: jobDescription,
      status: status,
    };

    onAddWorkOrder(newOrder);

    // Clear the form
    setClientName('');
    setJobDescription('');
    setStatus('pending');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', textAlign: 'left', maxWidth: '600px', marginInline: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Add New Work Order</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Client Name</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
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
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
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
