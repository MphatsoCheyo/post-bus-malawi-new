const express = require('express');
const router = express.Router();
const { sendBookingCancellationEmail } = require('../services/emailService');
router.post('/booking-cancelled', async (req, res) => {
  try {
    const { passengerEmail, passengerName, bookingId, fromCity, toCity, busNumber, seatLabels, travelDate, departureTime, totalPrice, refundAmount } = req.body;
    const bookingDetails = {
      bookingId, from: fromCity, to: toCity, busNumber,
      seat: seatLabels, date: travelDate, departureTime,
      totalPrice, refundAmount,
      refundPolicy: 'Refund will be processed within 3-5 business days.',
      cancelledAt: new Date().toLocaleString()
    };
    await sendBookingCancellationEmail(passengerEmail, passengerName, bookingDetails);
    res.status(200).json({ success: true, message: 'Cancellation email sent!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
