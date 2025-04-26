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
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Work Orders</h1>

      {/* Create Work Order Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ fontWeight: "bold" }}>Client Name:</label><br />
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div>
          <label style={{ fontWeight: "bold" }}>Job Description:</label><br />
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", minHeight: "80px" }}
          />
        </div>
        <div>
          <label style={{ fontWeight: "bold" }}>Status:</label><br />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}>
          Create Work Order
        </button>
      </form>

      {/* List of Work Orders */}
      {workorders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No work orders found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {workorders.map((order) => (
            <li key={order.id} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "8px" }}>
              <strong>Client:</strong> {order.client_name}<br />
              <strong>Job:</strong> {order.job_description}<br />
              <strong>Status:</strong> {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
