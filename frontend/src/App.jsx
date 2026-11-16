import { useMemo, useState } from "react";
import "./App.css";

import BookingForm from "./components/BookingForm";
import CalendarPanel from "./components/CalendarPanel";
import MobileNavigation from "./components/MobileNavigation";
import OperationsList from "./components/OperationsList";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import {
  createBooking,
  createOperation,
  createBookingOperationLink,
} from "./data/bookingModel";

import {
  loadBBOSData,
} from "./data/bookingStorage";

const DATA_KEYS = {
  bookings: "bbos_bookings",
  operations: "bbos_tour_operations",
  links: "bbos_booking_operation_links",
};

function readInitialData() {
  for (const key of Object.values(DATA_KEYS)) {
    const raw = localStorage.getItem(key);

    if (raw === null) continue;

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error(`Invalid data format: ${key}`);
    }
  }

  return loadBBOSData();
}

function saveDataSafely(data) {
  const previous = {};

  for (const [name, key] of Object.entries(DATA_KEYS)) {
    previous[name] = localStorage.getItem(key);
  }

  try {
    localStorage.setItem(
      DATA_KEYS.bookings,
      JSON.stringify(data.bookings)
    );

    localStorage.setItem(
      DATA_KEYS.operations,
      JSON.stringify(data.operations)
    );

    localStorage.setItem(
      DATA_KEYS.links,
      JSON.stringify(data.links)
    );
  } catch (error) {
    console.error("BBOS save failed:", error);

    for (const [name, key] of Object.entries(DATA_KEYS)) {
      try {
        if (previous[name] === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, previous[name]);
        }
      } catch (restoreError) {
        console.error("Restore failed:", restoreError);
      }
    }

    throw new Error(
      "Could not save booking. Please check browser storage."
    );
  }
}

function getOperationView(data) {
  const bookingsById = new Map(
    data.bookings.map((booking) => [booking.id, booking])
  );

  const linksByOperation = new Map();

  for (const link of data.links) {
    if (!linksByOperation.has(link.operationId)) {
      linksByOperation.set(link.operationId, []);
    }

    linksByOperation.get(link.operationId).push(link);
  }

  return data.operations.map((operation) => {
    const operationLinks =
      linksByOperation.get(operation.id) || [];

    const connected = operationLinks
      .map((link) => ({
        link,
        booking: bookingsById.get(link.bookingId),
      }))
      .filter((item) => Boolean(item.booking));

    const active = connected.filter(
      ({ booking }) => booking.status !== "Cancelled"
    );

    const pax = active.reduce(
      (total, { link }) => total + Number(link.pax || 0),
      0
    );

    const bookerNames = active
      .map(({ booking }) => booking.booker)
      .filter(Boolean);

    const sources = [
      ...new Set(
        active.map(({ booking }) => booking.source).filter(Boolean)
      ),
    ];

    const pendingPayments = active.filter(
      ({ booking }) => booking.paymentStatus === "Pending"
    ).length;

    return {
      ...operation,
      pax,
      booker: bookerNames.join(", "),
      source: sources.join(", "),
      bookingCount: active.length,
      pendingPayments,
    };
  });
}

function isSameDate(dateString, targetDate) {
  if (!dateString) return false;

  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return (
    year === targetDate.getFullYear() &&
    month === targetDate.getMonth() + 1 &&
    day === targetDate.getDate()
  );
}

function App() {
  const [data, setData] = useState(readInitialData);
  const [saveError, setSaveError] = useState("");

  const operations = useMemo(
    () => getOperationView(data),
    [data]
  );

  function saveBooking(newBooking) {
    const timestamp = new Date().toISOString();
    const uniqueId = crypto.randomUUID();

    const bookingId = `IOB-B-${uniqueId}`;
    const operationId = `IOB-O-${uniqueId}`;
    const linkId = `IOB-L-${uniqueId}`;

    const booking = createBooking({
      id: bookingId,
      business: "IOB",
      source: newBooking.source,
      booker: newBooking.booker,
      pax: newBooking.pax,
      status: "Confirmed",
      paymentStatus: "Pending",
      createdAt: timestamp,
    });

    const operation = createOperation({
      id: operationId,
      business: "IOB",
      service: newBooking.service,
      tourDate: newBooking.tourDate,
      startTime: "09:00",
      status: "Confirmed",
      createdAt: timestamp,
    });

    const link = createBookingOperationLink({
      id: linkId,
      bookingId,
      operationId,
      pax: newBooking.pax,
    });

    const nextData = {
      bookings: [booking, ...data.bookings],
      operations: [operation, ...data.operations],
      links: [link, ...data.links],
    };

    try {
      saveDataSafely(nextData);
      setData(nextData);
      setSaveError("");
    } catch (error) {
      setSaveError(error.message);
      throw error;
    }
  }

  const dashboardStats = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    const activeOperations = operations.filter(
      (operation) => operation.status !== "Cancelled"
    );

    const todayOperations = activeOperations.filter(
      (operation) => isSameDate(operation.tourDate, today)
    );

    const tomorrowOperations = activeOperations.filter(
      (operation) => isSameDate(operation.tourDate, tomorrow)
    );

    const todayGuests = todayOperations.reduce(
      (total, operation) => total + operation.pax,
      0
    );

    const pendingPayments = data.bookings.filter(
      (booking) =>
        booking.paymentStatus === "Pending" &&
        booking.status !== "Cancelled"
    ).length;

    return {
      todayTours: todayOperations.length,
      todayGuests,
      tomorrowTours: tomorrowOperations.length,
      pendingPayments,
    };
  }, [operations, data.bookings]);

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-shell">
        <Topbar />

        <main className="dashboard-content">
          {saveError && (
            <p className="form-message error" role="alert">
              {saveError}
            </p>
          )}

          <section className="operations-workspace">
            <div className="booking-column" id="new-booking">
              <BookingForm onSave={saveBooking} />
            </div>

            <div className="calendar-column">
              <CalendarPanel operations={operations} />
            </div>
          </section>

          <section className="dashboard-lower-grid">
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
                      {dashboardStats.pendingPayments} booking
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
                      Guide and assistant assignment will be added
                      in a later sprint.
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

            <OperationsList operations={operations} />
          </section>
        </main>

        <MobileNavigation />
      </div>
    </div>
  );
}

export default App;