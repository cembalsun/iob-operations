const mobileItems = [
  { icon: "⌂", label: "Dashboard", active: true },
  { icon: "▣", label: "Bookings" },
  { icon: "📅", label: "Calendar" },
  { icon: "🚴", label: "Operations" },
  { icon: "•••", label: "More" },
];

function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      {mobileItems.map((item) => (
        <button
          className={
            item.active
              ? "mobile-navigation-item active"
              : "mobile-navigation-item"
          }
          key={item.label}
          type="button"
        >
          <span>{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}

export default MobileNavigation;