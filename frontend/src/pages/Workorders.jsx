import { useState } from 'react';
import WorkOrderList from '../components/WorkOrderList';

function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([
    { id: 1, title: "Move painting to gallery", description: "Pickup at client's house and deliver to downtown gallery.", status: "Pending" },
    { id: 2, title: "Pick up sculpture", description: "Collect sculpture from art fair booth 34B.", status: "Completed" },
  ]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Work Orders Page</h1>
      <p>Manage your upcoming work orders below:</p>
      
      <div style={{ marginTop: "2rem" }}>
        <WorkOrderList workOrders={workOrders} />
      </div>
    </div>
  );
}

export default WorkOrders;
