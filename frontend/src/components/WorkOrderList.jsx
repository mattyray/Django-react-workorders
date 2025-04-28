// src/components/WorkOrderList.jsx

function WorkOrderList({ workOrders }) {
    if (workOrders.length === 0) {
      return <p>No work orders available.</p>;
    }
  
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
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
            <h3 style={{ marginBottom: "0.5rem" }}>{order.title}</h3>
            <p style={{ marginBottom: "0.5rem" }}>{order.description}</p>
            <p style={{ fontSize: "0.9rem", color: "#4CAF50" }}>{order.status}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default WorkOrderList;
  