import { useState } from 'react';

function EventForm({ workOrderId, onEventAdded }) {
  const [eventType, setEventType] = useState('pickup');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onEventAdded(workOrderId, {
      event_type: eventType,
      address,
      date,
    });
    setEventType('pickup');
    setAddress('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <h4>Add Event</h4>
      <div>
        <label>Type</label>
        <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="pickup">Pickup</option>
          <option value="install">Install</option>
          <option value="dropoff">Dropoff</option>
          <option value="wrap">Wrap</option>
        </select>
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
