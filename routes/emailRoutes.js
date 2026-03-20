const express = require('express');
const router = express.Router();
const { sendBookingCancellationEmail } = require('../services/emailService');
router.post('/booking-cancelled', async (req, res) => {
  try {
    const {
      passengerEmail, passengerName, bookingId,
      fromCity, toCity, busNumber, seatLabels,
      travelDate, departureTime, totalPrice, refundAmount
    } = req.body;

    const toEmail = passengerEmail;
    const toName = passengerName;
    const bookingDetails = {
      bookingId, fromCity, toCity, busNumber,
      seatLabels, travelDate, departureTime,
      totalPrice, refundAmount
    };

    await sendBookingCancellationEmail(toEmail, toName, bookingDetails);
    res.status(200).json({ success: true, message: 'Cancellation email sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
