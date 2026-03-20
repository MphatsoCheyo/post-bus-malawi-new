const express = require('express');
const router = express.Router();
const { sendBookingCancellationEmail } = require('../services/emailService');

router.post('/booking-cancelled', async (req, res) => {
  try {
    const { toEmail, toName, bookingDetails } = req.body;
    await sendBookingCancellationEmail(toEmail, toName, bookingDetails);
    res.status(200).json({ success: true, message: 'Cancellation email sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;