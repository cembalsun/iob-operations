import { useState } from "react";

function BookingForm({ onSave }) {
  const products = {
    GYG: [
      "ERS - Eurasia Bike & Boat",
      "OLD4 - Old City Basic",
      "OLD6 - Old City Deluxe",
    ],

    VIA: [
      "ERS - Eurasia Bike & Boat",
      "OLD4 - Old City Basic",
      "OLD6 - Old City Deluxe",
    ],

    BTC: [
      "ERS - Eurasia Bike & Boat",
    ],

    CYC: [
      "ERS - Eurasia Bike & Boat",
      "OLD4 - Old City Basic",
      "OLD6 - Old City Deluxe",
      "OLD8 - Old City Combo",
      "BOS - Beauties of Bosphorus",
      "BPK - Bike Packing",
      "BTP - Bike Travel Package",
    ],

    B2B: [
      "ERS - Eurasia Bike & Boat",
      "OLD4 - Old City Basic",
      "OLD6 - Old City Deluxe",
      "OLD8 - Old City Combo",
      "BPK - Bike Packing",
      "BTP - Bike Travel Package",
    ],
  };

  const [source, setSource] = useState("GYG");
  const [service, setService] = useState(products.GYG[0]);
  const [tourDate, setTourDate] = useState("");
  const [booker, setBooker] = useState("");
  const [pax, setPax] = useState("");

  function handleSourceChange(e) {
    const newSource = e.target.value;
    setSource(newSource);
    setService(products[newSource][0]);
  }

  function handleSave() {
    const booking = {
      source,
      service,
      tourDate,
      booker,
      pax,
    };

    console.log("Booking Saved:", booking);

    if (onSave) {
      onSave(booking);
    }
  }

  return (
    <section className="booking-form">

      <h2>New Booking</h2>

      <div className="form-row">
        <label>Booking Source</label>

        <select value={source} onChange={handleSourceChange}>
          <option value="GYG">GYG - GetYourGuide</option>
          <option value="VIA">VIA - Viator</option>
          <option value="BTC">BTC - BikeTours.com</option>
          <option value="CYC">CYC - Direct Booking</option>
          <option value="B2B">B2B</option>
        </select>

      </div>

      <div className="form-row">
        <label>Tour Date</label>

        <input
          type="date"
          value={tourDate}
          onChange={(e) => setTourDate(e.target.value)}
        />

      </div>

      <div className="form-row">
        <label>Product</label>

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          {products[source].map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>

      </div>

      <div className="form-row">
        <label>Booker Name</label>

        <input
          type="text"
          value={booker}
          onChange={(e) => setBooker(e.target.value)}
        />

      </div>

      <div className="form-row">
        <label>Pax</label>

        <input
          type="number"
          value={pax}
          onChange={(e) => setPax(e.target.value)}
        />

      </div>

      <button
        className="save-btn"
        onClick={handleSave}
      >
        Save Booking
      </button>

    </section>
  );
}

export default BookingForm;