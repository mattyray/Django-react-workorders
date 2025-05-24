import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWorkOrders } from '../services/api';

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchWorkOrders();
        setWorkOrders(res.data);
      } catch (e) {
        setError('Failed to fetch work orders.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const statusBadge = (status) => {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold inline-block';
    if (status === 'pending') return `${base} bg-yellow-100 text-yellow-800`;
    if (status === 'in_progress') return `${base} bg-blue-100 text-blue-800`;
    if (status === 'completed') return `${base} bg-green-100 text-green-800`;
    return base;
  };

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

      {loading && (
        <p className="text-blue-600 text-lg font-semibold">Loading work orders...</p>
      )}

      {error && (
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Client', 'Status', 'Created'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workOrders.map((o) => (
                <tr
                  key={o.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/workorders/${o.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {o.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {o.client_name || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={statusBadge(o.status)}>
                      {o.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
