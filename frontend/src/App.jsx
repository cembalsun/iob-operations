import "./App.css";

function App() {
  return (
    <div className="app">

      <header className="header">
        <h1>🚴 IOB Business OS</h1>
      </header>

      <div className="container">

        <aside className="sidebar">
          <h3>Menu</h3>

          <ul>
            <li>🏠 Dashboard</li>
            <li>📅 Reservations</li>
            <li>🚴 Operations</li>
            <li>👥 Staff</li>
            <li>💶 Finance</li>
            <li>📊 Reports</li>
            <li>⚙️ Settings</li>
          </ul>

        </aside>

        <main className="content">

          <h2>New Reservation</h2>

          <p>Welcome to IOB Business OS.</p>

          <p>This will be our first real reservation screen.</p>

        </main>

      </div>

    </div>
  );
}

export default App;