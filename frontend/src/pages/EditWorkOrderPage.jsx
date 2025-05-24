import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditWorkOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8002/api/workorders/${id}/`)
      .then(res => setForm(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to load work order.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const addEvent = () =>
    setForm(f => ({
      ...f,
      events: [...f.events, { event_type: 'pickup', address: '', date: '' }],
    }));

  const updateEvent = (i, key, val) =>
    setForm(f => {
      const ev = [...f.events];
      ev[i] = { ...ev[i], [key]: val };
      return { ...f, events: ev };
    });

  const removeEvent = i =>
    setForm(f => {
      const ev = [...f.events];
      ev.splice(i, 1);
      return { ...f, events: ev };
    });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8002/api/workorders/${id}/`,
        form
      );
      navigate(`/workorders/${id}`);
    } catch (err) {
      console.error('🔴 Error in save:', err);
      alert('Failed to save changes.');
    }
  };

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

  if (!form) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Work order not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Work Order #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Client Name"
          value={form.client_name}
          onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Job Description"
          value={form.job_description}
          onChange={e =>
            setForm(f => ({ ...f, job_description: e.target.value }))
          }
          className="w-full p-2 border rounded"
          rows={4}
        />

        <select
          value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div>
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          {form.events.map((ev, i) => (
            <div key={i} className="mb-4 p-4 border rounded space-y-2">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeEvent(i)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              <select
                value={ev.event_type}
                onChange={e => updateEvent(i, 'event_type', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="pickup">Pickup</option>
                <option value="install">Install</option>
                <option value="dropoff">Drop Off</option>
                <option value="wrap">Wrap</option>
              </select>
              <input
                type="text"
                placeholder="Address"
                value={ev.address}
                onChange={e => updateEvent(i, 'address', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                value={ev.date}
                onChange={e => updateEvent(i, 'date', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEvent}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Add Event
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
