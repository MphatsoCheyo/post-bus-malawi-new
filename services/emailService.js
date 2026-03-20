const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const sendBookingCancellationEmail = async (toEmail, toName, bookingDetails) => {
  const {
    bookingId, from, to, date, seat,
    busNumber, departureTime, totalPrice,
    refundAmount, refundPolicy, cancelledAt
  } = bookingDetails;

  await transporter.sendMail({
    from: `"Post Bus Malawi 🚌" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: `Booking Cancelled — ${from} → ${to} | Post Bus Malawi`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
        <div style="background: #e74c3c; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">🚌 Post Bus Malawi</h1>
          <p style="color: white; margin: 5px 0;">Booking Cancellation Notice</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
          <p>Dear <strong>${toName}</strong>,</p>
          <p>Your booking has been <strong style="color: #e74c3c;">cancelled</strong>.</p>
          <div style="background: #f8f8f8; border-left: 4px solid #e74c3c; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 12px 0;">Booking Details</h3>
            <p style="margin: 6px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
            <p style="margin: 6px 0;"><strong>Route:</strong> ${from} → ${to}</p>
            <p style="margin: 6px 0;"><strong>Bus:</strong> ${busNumber}</p>
            <p style="margin: 6px 0;"><strong>Seat(s):</strong> ${seat}</p>
            <p style="margin: 6px 0;"><strong>Travel Date:</strong> ${date}</p>
            <p style="margin: 6px 0;"><strong>Departure:</strong> ${departureTime}</p>
            <p style="margin: 6px 0;"><strong>Amount Paid:</strong> ${totalPrice}</p>
            <p style="margin: 6px 0;"><strong>Cancelled At:</strong> ${cancelledAt}</p>
          </div>
          <div style="background: #fff8e1; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 12px 0;">Refund Information</h3>
            <p style="margin: 6px 0;"><strong>Refund Amount:</strong>
              <span style="color: #00c853; font-size: 18px; font-weight: bold;"> ${refundAmount}</span>
            </p>
            <p style="margin: 6px 0; color: #666;">${refundPolicy}</p>
          </div>
          <p style="color: #666;">If you did not request this cancellation, please contact us immediately.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
          <p style="color: #999; font-size: 12px; text-align: center;">Post Bus Malawi — Do not reply to this email.</p>
        </div>
      </div>
    `
  });

  console.log(`✅ Cancellation email sent to ${toEmail}`);
};

module.exports = { sendBookingCancellationEmail };