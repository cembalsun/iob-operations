import "./App.css";

function App() {
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

    <section className="booking-form">

      <h2>New Booking</h2>

      <div className="form-row">
        <label>Booking Source</label>
        <select>
          <option>GetYourGuide</option>
          <option>Viator</option>
          <option>BikeTours.com</option>
          <option>Direct Booking</option>
          <option>B2B</option>
        </select>
      </div>

      <div className="form-row">
        <label>Tour Date</label>
        <input type="date" />
      </div>

      <div className="form-row">
        <label>Service</label>
        <select>
          <option>Eurasia Bike & Boat</option>
          <option>Old City Basic (4h)</option>
          <option>Old City Deluxe (6h)</option>
          <option>Old City Combo (8h)</option>
          <option>Beauties of Bosphorus</option>
        </select>
      </div>

      <div className="form-row">
        <label>Booker Name</label>
        <input type="text" />
      </div>

      <div className="form-row">
        <label>Pax</label>
        <input type="number" />
      </div>

      <button className="save-btn">
        Save Booking
      </button>

    </section>

    <section className="calendar-panel">

      <h2>July 2026</h2>

      <div className="calendar-placeholder">

        Monthly Operations Calendar

      </div>

    </section>

  </div>

</main>
 </div>

    </div>

  );
}

export default App;