function OperationsList({ operations }) {
  return (
    <section className="operations-list">
      <h2>Operations</h2>

      {operations.length === 0 ? (
        <p>No operations yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Booker</th>
              <th>Product</th>
              <th>Pax</th>
            </tr>
          </thead>

          <tbody>
            {operations.map((op) => (
              <tr key={op.id}>
                <td>{op.id}</td>
                <td>{op.booker}</td>
                <td>{op.service}</td>
                <td>{op.pax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default OperationsList;