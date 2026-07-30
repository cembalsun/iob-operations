function formatCurrentDate() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function Topbar() {
  return (
    <header className="topbar">
      <div>
        <span className="topbar-date">{formatCurrentDate()}</span>
      </div>

      <div className="topbar-actions">
        <button className="topbar-icon-button" type="button" aria-label="Search">
          ⌕
        </button>

        <button
          className="topbar-icon-button notification-button"
          type="button"
          aria-label="Notifications"
        >
          ♢
          <span className="notification-indicator" />
        </button>

        <div className="user-profile">
          <div className="user-avatar">CB</div>

          <div>
            <strong>Cem Balsun</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;