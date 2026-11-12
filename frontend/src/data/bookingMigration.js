
import {
  createBooking,
  createOperation,
  createBookingOperationLink,
} from "./bookingModel";

import {
  loadBBOSData,
  saveBookings,
  saveOperations,
  saveBookingOperationLinks,
} from "./bookingStorage";

const LEGACY_STORAGE_KEY = "bbos_operations";

function loadLegacyRecords() {
  const raw = localStorage.getItem(LEGACY_STORAGE_KEY);

  if (raw === null) {
    throw new Error("Legacy storage not found. Migration stopped.");
  }

  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Legacy data is not valid JSON. Migration stopped.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Legacy data must be an array. Migration stopped.");
  }

  if (parsed.some((record) => !record || !record.id)) {
    throw new Error("A legacy record has no valid ID. Migration stopped.");
  }

  const ids = parsed.map((record) => record.id);

  if (new Set(ids).size !== ids.length) {
    throw new Error("Duplicate legacy IDs detected. Migration stopped.");
  }

  return parsed;
}

function validateExistingCollection(key) {
  const raw = localStorage.getItem(key);

  if (raw === null) return;

  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`Invalid JSON in ${key}. Migration stopped.`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`${key} must contain an array. Migration stopped.`);
  }
}

export function migrateLegacyBookings() {
  // Validate all collections before making changes.
  const legacyRecords = loadLegacyRecords();

  validateExistingCollection("bbos_bookings");
  validateExistingCollection("bbos_tour_operations");
  validateExistingCollection("bbos_booking_operation_links");

  const current = loadBBOSData();

  const bookings = [...current.bookings];
  const operations = [...current.operations];
  const links = [...current.links];

  let migratedCount = 0;

  for (const legacy of legacyRecords) {
    const bookingId = legacy.id;
    const operationId = `OP-${legacy.id}`;
    const linkId = `LINK-${legacy.id}`;

    const bookingExists = bookings.some(
      (booking) => booking.id === bookingId
    );

    const operationExists = operations.some(
      (operation) => operation.id === operationId
    );

    const linkExists = links.some(
      (link) => link.id === linkId
    );

    if (!bookingExists) {
      bookings.push(
        createBooking({
          id: bookingId,
          business: legacy.business || "IOB",
          source: legacy.source,
          booker: legacy.booker,
          phone: legacy.phone,
          pax: legacy.pax,
          status: legacy.status,
          saleAmount: legacy.saleAmount,
          saleCurrency: legacy.saleCurrency,
          paymentStatus: legacy.paymentStatus,
          notes: legacy.notes,
          createdAt: legacy.createdAt,
        })
      );
    }

    if (!operationExists) {
      operations.push(
        createOperation({
          id: operationId,
          business: legacy.business || "IOB",
          service: legacy.service,
          tourDate: legacy.tourDate,
          startTime: legacy.startTime,
          status: legacy.status,
          guide: legacy.guide,
          assistant: legacy.assistant,
          notes: legacy.notes,
          createdAt: legacy.createdAt,
        })
      );
    }

    if (!linkExists) {
      links.push(
        createBookingOperationLink({
          id: linkId,
          bookingId,
          operationId,
          pax: legacy.pax,
        })
      );
    }

    if (!bookingExists || !operationExists || !linkExists) {
      migratedCount += 1;
    }
  }

  if (migratedCount > 0) {
    saveBookings(bookings);
    saveOperations(operations);
    saveBookingOperationLinks(links);
  }

  return {
    legacyCount: legacyRecords.length,
    migratedCount,
    bookingCount: bookings.length,
    operationCount: operations.length,
    linkCount: links.length,
  };
}