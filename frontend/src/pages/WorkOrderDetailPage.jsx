import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../utils/formatDate';

export default function WorkOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8002/api/workorders/${id}/`)
      .then((res) => setOrder(res.data))
      .catch((err) => {
        setError("Failed to load work order.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600 text-lg font-semibold">
        Loading work order...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Work order not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Work Order #{order.id}</h1>
        <button
          onClick={() => navigate(`/workorders/${id}/edit`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Edit
        </button>
      </div>
      <div className="space-y-2">
        <p><strong>Client:</strong> {order.client_name}</p>
        <p><strong>Description:</strong> {order.job_description}</p>
        <p><strong>Status:</strong> {order.status.replace('_',' ')}</p>
        <p><strong>Created:</strong> {formatDate(order.created_at)}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Events</h2>
        {order.events.length === 0 ? (
          <p>No scheduled events.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {order.events.map((e) => (
              <li key={e.id}>
                {e.event_type.replace('_',' ')} at {e.address} on {formatDate(e.date)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
