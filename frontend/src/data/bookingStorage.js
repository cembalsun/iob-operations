const STORAGE_KEYS = {
  bookings: "bbos_bookings",
  operations: "bbos_tour_operations",
  links: "bbos_booking_operation_links",
};

function readCollection(key) {
  try {
    const storedData = localStorage.getItem(key);

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return [];
  }
}

function writeCollection(key, records) {
  if (!Array.isArray(records)) {
    throw new Error("Storage data must be an array.");
  }

  localStorage.setItem(key, JSON.stringify(records));
}

export function loadBookings() {
  return readCollection(STORAGE_KEYS.bookings);
}

export function saveBookings(bookings) {
  writeCollection(STORAGE_KEYS.bookings, bookings);
}

export function loadOperations() {
  return readCollection(STORAGE_KEYS.operations);
}

export function saveOperations(operations) {
  writeCollection(STORAGE_KEYS.operations, operations);
}

export function loadBookingOperationLinks() {
  return readCollection(STORAGE_KEYS.links);
}

export function saveBookingOperationLinks(links) {
  writeCollection(STORAGE_KEYS.links, links);
}

export function loadBBOSData() {
  return {
    bookings: loadBookings(),
    operations: loadOperations(),
    links: loadBookingOperationLinks(),
  };
}