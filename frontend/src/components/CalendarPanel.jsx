import { useMemo, useState } from "react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDateKey(year, monthIndex, day) {
  const month = String(monthIndex + 1).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  return `${year}-${month}-${formattedDay}`;
}

function getOperationCode(service) {
  if (!service) {
    return "TOUR";
  }

  return service.split(" - ")[0];
}

function CalendarPanel({ operations }) {
  const [visibleDate, setVisibleDate] = useState(new Date());

  const year = visibleDate.getFullYear();
  const monthIndex = visibleDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    const mondayBasedStartDay = (firstDay.getDay() + 6) % 7;
    const numberOfDays = lastDay.getDate();

    const cells = [];

    for (let index = 0; index < mondayBasedStartDay; index += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= numberOfDays; day += 1) {
      cells.push(day);
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [monthIndex, year]);

  const operationsByDate = useMemo(() => {
    return operations.reduce((groupedOperations, operation) => {
      if (!operation.tourDate) {
        return groupedOperations;
      }

      if (!groupedOperations[operation.tourDate]) {
        groupedOperations[operation.tourDate] = [];
      }

      groupedOperations[operation.tourDate].push(operation);

      return groupedOperations;
    }, {});
  }, [operations]);

  function goToPreviousMonth() {
    setVisibleDate(new Date(year, monthIndex - 1, 1));
  }

  function goToNextMonth() {
    setVisibleDate(new Date(year, monthIndex + 1, 1));
  }

  function goToCurrentMonth() {
    setVisibleDate(new Date());
  }

  const monthTitle = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(visibleDate);

  const todayKey = getDateKey(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  return (
    <section className="panel-card calendar-panel">
      <div className="calendar-header">
        <div>
          <p className="panel-kicker">OPERATIONS CALENDAR</p>
          <h2>{monthTitle}</h2>
        </div>

        <div className="calendar-controls">
          <button type="button" onClick={goToPreviousMonth}>
            ‹
          </button>

          <button
            className="calendar-today-button"
            type="button"
            onClick={goToCurrentMonth}
          >
            Today
          </button>

          <button type="button" onClick={goToNextMonth}>
            ›
          </button>
        </div>
      </div>

      <div className="calendar-grid calendar-weekdays">
        {weekDays.map((weekDay) => (
          <div key={weekDay}>{weekDay}</div>
        ))}
      </div>

      <div className="calendar-grid calendar-days">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div className="calendar-day empty" key={`empty-${index}`} />;
          }

          const dateKey = getDateKey(year, monthIndex, day);
          const dayOperations = operationsByDate[dateKey] || [];

          return (
            <div
              className={
                dateKey === todayKey
                  ? "calendar-day current-day"
                  : "calendar-day"
              }
              key={dateKey}
            >
              <div className="calendar-day-number">
                <span>{day}</span>

                {dayOperations.length > 0 && (
                  <small>{dayOperations.length}</small>
                )}
              </div>

              <div className="calendar-operation-list">
                {dayOperations.slice(0, 3).map((operation) => (
                  <article
                    className={`calendar-operation status-${(
                      operation.status || "Confirmed"
                    ).toLowerCase()}`}
                    key={operation.id}
                    title={`${operation.service} — ${operation.booker}`}
                  >
                    <strong>{getOperationCode(operation.service)}</strong>
                    <span>{operation.pax} pax</span>
                  </article>
                ))}

                {dayOperations.length > 3 && (
                  <span className="more-operations">
                    +{dayOperations.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CalendarPanel;