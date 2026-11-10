export const BUSINESS_CODES = {
  IOB: "Istanbul On Bike",
  TRV: "Tourever Travel",
};

export const BOOKING_STATUSES = [
  "Pending",
  "Confirmed",
  "Cancelled",
];

export const OPERATION_STATUSES = [
  "Planned",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export function createBooking(data) {
  return {
    id: data.id,
    business: data.business || "IOB",
    source: data.source || "CYC",
    booker: data.booker || "",
    phone: data.phone || "",
    pax: Number(data.pax || 0),
    status: data.status || "Confirmed",
    saleAmount: data.saleAmount ?? null,
    saleCurrency: data.saleCurrency || "EUR",
    paymentStatus: data.paymentStatus || "Pending",
    notes: data.notes || "",
    createdAt: data.createdAt || new Date().toISOString(),
  };
}

export function createOperation(data) {
  return {
    id: data.id,
    business: data.business || "IOB",
    service: data.service || "",
    tourDate: data.tourDate || "",
    startTime: data.startTime || "",
    status: data.status || "Planned",
    guide: data.guide || "",
    assistant: data.assistant || "",
    estimatedCost: data.estimatedCost ?? null,
    actualCost: data.actualCost ?? null,
    costCurrency: data.costCurrency || "TRY",
    notes: data.notes || "",
    createdAt: data.createdAt || new Date().toISOString(),
  };
}

export function createBookingOperationLink(data) {
  return {
    id: data.id,
    bookingId: data.bookingId,
    operationId: data.operationId,
    pax: Number(data.pax || 0),
    notes: data.notes || "",
  };
}