import { useState, useEffect } from 'react';
import axios from 'axios';
import WorkOrderList from '../components/WorkOrderList';
import WorkOrderForm from '../components/WorkOrderForm';

function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch work orders on page load
  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8002/api/workorders/');
      setWorkOrders(response.data);
    } catch (error) {
      console.error('Error fetching work orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWorkOrder = async (newOrder) => {
    try {
      const response = await axios.post('http://localhost:8002/api/workorders/', newOrder);
      setWorkOrders((prevOrders) => [response.data, ...prevOrders]);
    } catch (error) {
      console.error('Error adding work order:', error);
    }
  };

  const handleAddEvent = async (workOrderId, eventData) => {
    try {
      const response = await axios.post('http://localhost:8002/api/events/', {
        ...eventData,
        work_order: workOrderId,
      });

      // Update the specific work order with the new event
      setWorkOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === workOrderId
            ? {
                ...order,
                events: [...(order.events || []), response.data],
              }
            : order
        )
      );
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Work Orders Page</h1>
      <p>Manage your upcoming work orders below:</p>

      <WorkOrderForm onAddWorkOrder={handleAddWorkOrder} />

      <div style={{ marginTop: "2rem" }}>
        {loading ? (
          <p>Loading work orders...</p>
        ) : (
          <WorkOrderList workOrders={workOrders} onAddEvent={handleAddEvent} />
        )}
      </div>
    </div>
  );
}

export default WorkOrders;
