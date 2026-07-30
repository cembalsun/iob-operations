import { useEffect, useMemo, useState } from "react";
import "./App.css";

import BookingForm from "./components/BookingForm";
import CalendarPanel from "./components/CalendarPanel";
import MobileNavigation from "./components/MobileNavigation";
import OperationsList from "./components/OperationsList";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const STORAGE_KEY = "bbos_operations";

function getStoredOperations() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Operations could not be loaded:", error);
    return [];
  }
}

function getNextOperationId(operations) {
  const highestNumber = operations.reduce((highest, operation) => {
    const match = operation.id?.match(/IOB-\d{2}-(\d{4})/);

    if (!match) {
      return highest;
    }

    return Math.max(highest, Number(match[1]));
  }, 0);

  return `IOB-26-${String(highestNumber + 1).padStart(4, "0")}`;
}

function isSameDate(dateString, targetDate) {
  if (!dateString) {
    return false;
  }

  const [year, month, day] = dateString.split("-").map(Number);

  return (
    year === targetDate.getFullYear() &&
    month === targetDate.getMonth() + 1 &&
    day === targetDate.getDate()
  );
}

function App() {
  const [operations, setOperations] = useState(getStoredOperations);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(operations));
  }, [operations]);

  function saveBooking(newBooking) {
    const operation = {
      id: getNextOperationId(operations),
      ...newBooking,
      pax: Number(newBooking.pax),
      status: "Confirmed",
      guide: "",
      assistant: "",
      paymentStatus: "Pending",
      createdAt: new Date().toISOString(),
    };

    setOperations((currentOperations) => [
      operation,
      ...currentOperations,
    ]);
  }

  const dashboardStats = useMemo(() => {
    const today = new Date();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const todayOperations = operations.filter((operation) =>
      isSameDate(operation.tourDate, today)
    );

    const tomorrowOperations = operations.filter((operation) =>
      isSameDate(operation.tourDate, tomorrow)
    );

    const todayGuests = todayOperations.reduce(
      (total, operation) => total + Number(operation.pax || 0),
      0
    );

    const pendingPayments = operations.filter(
      (operation) =>
        operation.paymentStatus === "Pending" &&
        operation.status !== "Cancelled"
    ).length;

    return {
      todayTours: todayOperations.length,
      todayGuests,
      tomorrowTours: tomorrowOperations.length,
      pendingPayments,
    };
  }, [operations]);

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-shell">
        <Topbar />

        <main className="dashboard-content">
          <section className="dashboard-heading">
            <div>
              <p className="eyebrow">OPERATIONS OVERVIEW</p>
              <h1>Dashboard</h1>
              <p>
                Manage bookings, tours and daily operations from one place.
              </p>
            </div>

            <a className="primary-action" href="#new-booking">
              <span>＋</span>
              New Booking
            </a>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon stat-icon-green">🚴</div>

              <div>
                <span>Today's Tours</span>
                <strong>{dashboardStats.todayTours}</strong>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon-turquoise">👥</div>

              <div>
                <span>Today's Guests</span>
                <strong>{dashboardStats.todayGuests}</strong>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon-yellow">💳</div>

              <div>
                <span>Pending Payments</span>
                <strong>{dashboardStats.pendingPayments}</strong>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon-blue">📅</div>

              <div>
                <span>Tomorrow's Tours</span>
                <strong>{dashboardStats.tomorrowTours}</strong>
              </div>
            </article>
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-main-column">
              <CalendarPanel operations={operations} />

              <OperationsList operations={operations} />
            </div>

            <aside className="dashboard-side-column">
              <div id="new-booking">
                <BookingForm onSave={saveBooking} />
              </div>

              <section className="panel-card reminders-panel">
                <div className="panel-heading">
                  <div>
                    <p className="panel-kicker">ACTION CENTER</p>
                    <h2>Reminders</h2>
                  </div>

                  <span className="panel-count">
                    {dashboardStats.pendingPayments}
                  </span>
                </div>

                <div className="reminder-list">
                  <article className="reminder-item">
                    <span className="reminder-dot reminder-dot-yellow" />

                    <div>
                      <strong>Pending payments</strong>
                      <p>
                        {dashboardStats.pendingPayments} operation
                        {dashboardStats.pendingPayments === 1 ? "" : "s"} require
                        payment follow-up.
                      </p>
                    </div>
                  </article>

                  <article className="reminder-item">
                    <span className="reminder-dot reminder-dot-green" />

                    <div>
                      <strong>Guide assignments</strong>
                      <p>
                        Guide and assistant assignment will be added in the next
                        sprint.
                      </p>
                    </div>
                  </article>

                  <article className="reminder-item">
                    <span className="reminder-dot reminder-dot-turquoise" />

                    <div>
                      <strong>Tomorrow's operations</strong>
                      <p>
                        {dashboardStats.tomorrowTours} tour
                        {dashboardStats.tomorrowTours === 1 ? "" : "s"} currently
                        scheduled for tomorrow.
                      </p>
                    </div>
                  </article>
                </div>
              </section>
            </aside>
          </section>
        </main>

        <MobileNavigation />
      </div>
    </div>
  );
}

export default App;