import { useEffect, useState } from 'react';

function App() {
  const [workorders, setWorkorders] = useState([]);
  const [clientName, setClientName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = () => {
    fetch('http://localhost:8002/api/workorders/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched WorkOrders:', data);
        setWorkorders(data);
      })
      .catch(error => console.error('Error fetching work orders:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkOrder = {
      client_name: clientName,
      job_description: jobDescription,
      status: status,
    };

    fetch('http://localhost:8002/api/workorders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWorkOrder),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create work order');
        }
        return response.json();
      })
      .then(data => {
        console.log('Created new work order:', data);
        setClientName('');
        setJobDescription('');
        setStatus('pending');
        fetchWorkOrders(); // Refresh list after creating
      })
      .catch(error => console.error('Error creating work order:', error));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Work Orders</h1>

      {/* Create Work Order Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <div>
          <label>Client Name:</label><br />
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Job Description:</label><br />
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label><br />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Create Work Order</button>
      </form>

      {/* List of Work Orders */}
      {workorders.length === 0 ? (
        <p>No work orders found.</p>
      ) : (
        <ul>
          {workorders.map((order) => (
            <li key={order.id}>
              Client: {order.client_name} — Job: {order.job_description} — Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
