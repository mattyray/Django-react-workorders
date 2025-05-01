import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }     from 'react-router-dom';
import axios                           from 'axios';

export default function CreateWorkOrderPage({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    client_name: '',
    job_description: '',
    status: 'pending',
    events: [],
  });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8002/api/workorders/${id}/`)
        .then((res) => setForm(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const addEvent = () =>
    setForm((f) => ({
      ...f,
      events: [...f.events, { event_type: 'pickup', address: '', date: '' }],
    }));
  const updateEvent = (i, key, val) =>
    setForm((f) => {
      const ev = [...f.events];
      ev[i] = { ...ev[i], [key]: val };
      return { ...f, events: ev };
    });
  const removeEvent = (i) =>
    setForm((f) => {
      const ev = [...f.events];
      ev.splice(i, 1);
      return { ...f, events: ev };
    });

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:8002/api/workorders/${id}/`, form);
      } else {
        await axios.post(`http://localhost:8002/api/workorders/`, form);
      }
      navigate('/workorders');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {isEdit ? `Edit Work Order #${id}` : 'New Work Order'}
      </h1>

      {/* Client Info */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Client Name"
          value={form.client_name}
          onChange={(e) =>
            setForm((f) => ({ ...f, client_name: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Job Description"
          value={form.job_description}
          onChange={(e) =>
            setForm((f) => ({ ...f, job_description: e.target.value }))
          }
          className="w-full p-2 border rounded"
          rows={4}
        />
        <select
          value={form.status}
          onChange={(e) =>
            setForm((f) => ({ ...f, status: e.target.value }))
          }
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Events */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Events</h2>
        {form.events.map((e, i) => (
          <div key={i} className="mb-4 p-4 border rounded space-y-2">
            <div className="flex justify-end">
              <button
                onClick={() => removeEvent(i)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
            <select
              value={e.event_type}
              onChange={(ev) => updateEvent(i, 'event_type', ev.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="pickup">Pickup</option>
              <option value="install">Install</option>
              <option value="dropoff">Drop Off</option>
              <option value="wrap">Wrap</option>
            </select>
            <input
              type="text"
              placeholder="Address"
              value={e.address}
              onChange={(ev) => updateEvent(i, 'address', ev.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              value={e.date}
              onChange={(ev) => updateEvent(i, 'date', ev.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          onClick={addEvent}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      {/* Submit */}
      <div>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          {isEdit ? 'Save Changes' : 'Create Work Order'}
        </button>
      </div>
    </div>
  );
}
