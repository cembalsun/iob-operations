const navigationItems = [
  { icon: "⌂", label: "Dashboard", active: true },
  { icon: "◉", label: "Leads" },
  { icon: "▤", label: "Quotations" },
  { icon: "▣", label: "Bookings" },
  { icon: "🚴", label: "Operations" },
  { icon: "♟", label: "Staff" },
  { icon: "€", label: "Finance" },
  { icon: "▥", label: "Reports" },
];

function Sidebar() {
  return (
    <aside className="main-sidebar">
      <div className="brand-block">
        <div className="brand-mark">B</div>

        <div>
          <strong>BBOS</strong>
          <span>Operations System</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <p className="navigation-label">MAIN MENU</p>

        <ul>
          {navigationItems.map((item) => (
            <li key={item.label}>
              <button
                className={item.active ? "navigation-item active" : "navigation-item"}
                type="button"
              >
                <span className="navigation-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="navigation-item" type="button">
          <span className="navigation-icon">⚙</span>
          <span>Settings</span>
        </button>

        <div className="workspace-card">
          <span className="workspace-logo">IOB</span>

          <div>
            <strong>Istanbul On Bike</strong>
            <small>Current workspace</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;