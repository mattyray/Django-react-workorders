import React, { useState, useEffect } from 'react';
import { Link }                             from 'react-router-dom';
import WorkOrderList                        from '../components/WorkOrderList';
import { fetchWorkOrders }                  from '../services/api';

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchWorkOrders();
        setWorkOrders(response.data);
      } catch (error) {
        console.error('Error fetching work orders:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Work Orders</h1>
        <Link
          to="/workorders/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          New Work Order
        </Link>
      </div>

      {loading ? (
        <p>Loading work orders...</p>
      ) : (
        <WorkOrderList workOrders={workOrders} />
      )}
    </div>
  );
}
