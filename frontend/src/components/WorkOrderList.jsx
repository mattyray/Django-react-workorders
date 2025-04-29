import EventForm from './EventForm';

function WorkOrderList({ workOrders, onAddEvent }) {
  if (workOrders.length === 0) {
    return <p>No work orders available.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1rem",
      }}
    >
      {workOrders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: "#2a2a2a",
            color: "white",
            textAlign: "left",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>
            {order.client_name || "Untitled Work Order"}
          </h3>
          <p style={{ marginBottom: "0.5rem" }}>{order.job_description}</p>
          <p style={{ fontSize: "0.9rem", color: "#4CAF50" }}>{order.status}</p>

          {/* Events List */}
          {order.events?.length > 0 && (
            <>
              <h4 style={{ marginTop: "1rem" }}>Scheduled Events:</h4>
              <ul style={{ paddingLeft: "1rem", fontSize: "0.9rem" }}>
                {order.events.map((event, index) => (
                  <li key={index}>
                    <strong>{event.event_type}</strong> — {event.address} on {event.date}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Event Form */}
          <EventForm workOrderId={order.id} onEventAdded={onAddEvent} />
        </div>
      ))}
    </div>
  );
}

export default WorkOrderList;
