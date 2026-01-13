export async function saveBooking(booking) {
  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    return await res.json();
  } catch (err) {
    console.error("Error saving booking:", err);
  }
}

export async function getBookingHistory(userId) {
  try {
    const res = await fetch(`http://localhost:5000/api/bookings/${userId}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching history:", err);
    return [];
  }
}
