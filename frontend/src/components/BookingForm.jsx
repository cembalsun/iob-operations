import { useState } from "react";

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

  BTC: ["ERS - Eurasia Bike & Boat"],

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

function BookingForm({ onSave }) {
  const [source, setSource] = useState("GYG");
  const [service, setService] = useState(products.GYG[0]);
  const [tourDate, setTourDate] = useState("");
  const [booker, setBooker] = useState("");
  const [pax, setPax] = useState("");
  const [formMessage, setFormMessage] = useState("");

  function handleSourceChange(event) {
    const newSource = event.target.value;

    setSource(newSource);
    setService(products[newSource][0]);
  }

  function resetForm() {
    setTourDate("");
    setBooker("");
    setPax("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!tourDate || !booker.trim() || !pax || Number(pax) < 1) {
      setFormMessage("Please complete all required fields.");
      return;
    }

    onSave({
      source,
      service,
      tourDate,
      booker: booker.trim(),
      pax: Number(pax),
    });

    resetForm();
    setFormMessage("Booking saved successfully.");

    window.setTimeout(() => {
      setFormMessage("");
    }, 3000);
  }

  return (
    <section className="panel-card booking-form">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">QUICK ENTRY</p>
          <h2>New Booking</h2>
        </div>

        <span className="booking-form-icon">＋</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="booking-source">Booking Source</label>

          <select
            id="booking-source"
            value={source}
            onChange={handleSourceChange}
          >
            <option value="GYG">GYG - GetYourGuide</option>
            <option value="VIA">VIA - Viator</option>
            <option value="BTC">BTC - BikeTours.com</option>
            <option value="CYC">CYC - Direct Booking</option>
            <option value="B2B">B2B - Travel Agency</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="tour-date">Tour Date</label>

          <input
            id="tour-date"
            type="date"
            value={tourDate}
            onChange={(event) => setTourDate(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="booking-product">Product</label>

          <select
            id="booking-product"
            value={service}
            onChange={(event) => setService(event.target.value)}
          >
            {products[source].map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="booker-name">Booker Name</label>

          <input
            id="booker-name"
            type="text"
            value={booker}
            placeholder="Customer or lead guest"
            onChange={(event) => setBooker(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="booking-pax">Number of Guests</label>

          <input
            id="booking-pax"
            type="number"
            min="1"
            value={pax}
            placeholder="Pax"
            onChange={(event) => setPax(event.target.value)}
          />
        </div>

        {formMessage && (
          <p
            className={
              formMessage.includes("successfully")
                ? "form-message success"
                : "form-message error"
            }
          >
            {formMessage}
          </p>
        )}

        <button className="save-btn" type="submit">
          Save Booking
        </button>
      </form>
    </section>
  );
}

export default BookingForm;