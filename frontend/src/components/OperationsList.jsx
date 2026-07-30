function formatDate(dateString) {
  if (!dateString) {
    return "-";
  }

  const [year, month, day] = dateString.split("-");

  return `${day}.${month}.${year}`;
}

function getStatusClass(status) {
  return `status-badge status-${(status || "Confirmed").toLowerCase()}`;
}

function OperationsList({ operations }) {
  return (
    <section className="panel-card operations-panel">
      <div className="panel-heading operations-heading">
        <div>
          <p className="panel-kicker">RECENT ACTIVITY</p>
          <h2>Operations</h2>
        </div>

        <button className="secondary-button" type="button">
          View All
        </button>
      </div>

      {operations.length === 0 ? (
        <div className="empty-state">
          <span>🚴</span>
          <strong>No operations yet</strong>
          <p>Your saved bookings will appear here automatically.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="operations-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Source</th>
                <th>Booker</th>
                <th>Product</th>
                <th>Pax</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {operations.slice(0, 8).map((operation) => (
                <tr key={operation.id}>
                  <td>
                    <strong className="operation-id">{operation.id}</strong>
                  </td>

                  <td>{formatDate(operation.tourDate)}</td>

                  <td>
                    <span className="source-badge">{operation.source}</span>
                  </td>

                  <td>{operation.booker}</td>

                  <td className="product-cell">{operation.service}</td>

                  <td>{operation.pax}</td>

                  <td>
                    <span className={getStatusClass(operation.status)}>
                      {operation.status || "Confirmed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default OperationsList;