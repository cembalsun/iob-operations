import { useState } from "react";
import "./App.css";

import BookingForm from "./components/BookingForm";
import CalendarPanel from "./components/CalendarPanel";
import OperationsList from "./components/OperationsList";

function App() {
  const [operations, setOperations] = useState([]);

  function saveBooking(newBooking) {
    const operation = {
      id: `IOB-26-${String(operations.length + 1).padStart(4, "0")}`,
      ...newBooking,
    };

    setOperations([...operations, operation]);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🚴 BBOS - Balsun Business Operating System</h1>
      </header>

      <div className="container">
        <aside className="sidebar">
          <h3>Modules</h3>

          <ul>
            <li>🏠 Dashboard</li>
            <li>👤 Leads</li>
            <li>📝 Quotations</li>
            <li>📅 Bookings</li>
            <li>🚴 Operations</li>
            <li>👥 Staff</li>
            <li>💶 Finance</li>
            <li>📊 Reports</li>
            <li>⚙️ Settings</li>
          </ul>
        </aside>

        <main className="content">
          <div className="booking-layout">
            <BookingForm onSave={saveBooking} />

            <CalendarPanel />
          </div>

          <OperationsList operations={operations} />
        </main>
      </div>
    </div>
  );
}

export default App;