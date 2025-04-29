import { useState } from 'react';

function EventForm({ workOrderId, onEventAdded }) {
  const [eventType, setEventType] = useState('pickup');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !date) return;

    onEventAdded(workOrderId, {
      event_type: eventType,
      address,
      date,
    });

    // Reset
    setEventType('pickup');
    setAddress('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <h5 style={{ marginBottom: '0.5rem' }}>Add Event</h5>
      <div>
        <label>Type</label><br />
        <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="pickup">Pickup</option>
          <option value="install">Install</option>
          <option value="dropoff">Dropoff</option>
          <option value="wrap">Wrap</option>
        </select>
      </div>
      <div>
        <label>Address</label><br />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date</label><br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: "0.5rem" }}>
        Add
      </button>
    </form>
  );
}

export default EventForm;
