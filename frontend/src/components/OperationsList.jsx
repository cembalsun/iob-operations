function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleDateString("tr-TR");
}

function OperationsList({ operations }) {
  return (
    <div className="card">
      <h3>Today's Operations</h3>

      {operations.length === 0 ? (
        <p>No operations yet.</p>
      ) : (
        <table>
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
            {operations.map((operation) => (
              <tr key={operation.id}>
                <td>{operation.id}</td>
                <td>{formatDate(operation.tourDate)}</td>
                <td>{operation.source}</td>
                <td>{operation.booker}</td>
                <td>{operation.service}</td>
                <td>{operation.pax}</td>
                <td>{operation.status || "Confirmed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OperationsList;