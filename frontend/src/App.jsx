import { useEffect, useState } from 'react';

function App() {
  const [workorders, setWorkorders] = useState([]);
  const [clientName, setClientName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [status, setStatus] = useState('pending');
  const [completedAt, setCompletedAt] = useState('');

  // Event form state
  const [eventType, setEventType] = useState('pickup');
  const [eventAddress, setEventAddress] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [pendingEvents, setPendingEvents] = useState([]);

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

  const handleAddEvent = () => {
    if (!eventAddress || !eventDate) {
      alert('Please fill in both address and date for the event.');
      return;
    }

    const newEvent = {
      event_type: eventType,
      address: eventAddress,
      date: eventDate,
    };

    setPendingEvents(prevEvents => [...prevEvents, newEvent]);

    // Clear event form
    setEventType('pickup');
    setEventAddress('');
    setEventDate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkOrder = {
      client_name: clientName,
      job_description: jobDescription,
      estimated_cost: estimatedCost || null,
      status: status,
      completed_at: completedAt || null,
      events: pendingEvents,  // Attach events to the payload
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
        // Reset form
        setClientName('');
        setJobDescription('');
        setEstimatedCost('');
        setStatus('pending');
        setCompletedAt('');
        setPendingEvents([]);
        fetchWorkOrders();
      })
      .catch(error => console.error('Error creating work order:', error));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Create Work Order</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* WorkOrder Fields */}
        <div>
          <label>Client Name:</label><br />
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Job Description:</label><br />
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Estimated Cost ($):</label><br />
          <input
            type="number"
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
            step="0.01"
            placeholder="Optional"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Status:</label><br />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Completed At:</label><br />
          <input
            type="date"
            value={completedAt}
            onChange={(e) => setCompletedAt(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Events Section */}
        <h2 style={{ marginTop: "2rem" }}>Add Events</h2>

        <div>
          <label>Event Type:</label><br />
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="pickup">Pickup</option>
            <option value="pickup_wrap">Pickup and Wrap</option>
            <option value="wrap">Wrap</option>
            <option value="install">Install</option>
            <option value="deliver_install">Deliver and Install</option>
            <option value="dropoff">Drop Off</option>
          </select>
        </div>

        <div>
          <label>Event Address:</label><br />
          <input
            type="text"
            value={eventAddress}
            onChange={(e) => setEventAddress(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Event Date:</label><br />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="button" onClick={handleAddEvent} style={{ marginTop: "1rem", backgroundColor: "#007BFF", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
          ➕ Add Event
        </button>

        {/* List of Pending Events */}
        {pendingEvents.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3>Pending Events:</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {pendingEvents.map((event, index) => (
                <li key={index} style={{ padding: "8px", backgroundColor: "#f1f1f1", marginBottom: "8px", borderRadius: "6px", color: "black" }}>
                  {event.event_type} at {event.address} on {event.date}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" style={{ marginTop: "2rem", backgroundColor: "#28A745", color: "white", padding: "10px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
          📝 Create Work Order
        </button>
      </form>

      {/* List of Saved Work Orders */}
      <h2 style={{ textAlign: "center" }}>Saved Work Orders</h2>
      {workorders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No work orders found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {workorders.map((order) => (
            <li key={order.id} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "8px", color: "black" }}>
              <strong>Client:</strong> {order.client_name}<br />
              <strong>Job:</strong> {order.job_description}<br />
              <strong>Status:</strong> {order.status}<br />
              <strong>Estimated Cost:</strong> {order.estimated_cost ? `$${order.estimated_cost}` : 'N/A'}<br />
              <strong>Completed At:</strong> {order.completed_at ? new Date(order.completed_at).toLocaleDateString() : 'Not completed yet'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
