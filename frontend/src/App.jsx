import { useEffect, useState } from 'react';

function App() {
  const [workorders, setWorkorders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8002/api/workorders/')
      .then(response => response.json())
      .then(data => setWorkorders(data))
      .catch(error => console.error('Error fetching work orders:', error));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Work Orders</h1>
      {workorders.length === 0 ? (
        <p>No work orders found.</p>
      ) : (
        <ul>
          {workorders.map((order) => (
            <li key={order.id}>
              Job: {order.job_description} - Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
