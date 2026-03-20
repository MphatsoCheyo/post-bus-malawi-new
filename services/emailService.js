const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendBookingCancellationEmail = async (toEmail, toName, bookingDetails) => {
  const {
    bookingId,
    from,
    to,
    busNumber,
    seat,
    date,
    departureTime,
    totalPrice,
    refundAmount,
    refundPolicy,
    cancelledAt,
  } = bookingDetails;

  await transporter.sendMail({
    from: `"Post Bus Malawi 🚌" <${process.env.GMAIL_USER}>`,
    to:   toEmail,
    subject: `Booking Cancelled – ${from} → ${to} | Post Bus Malawi`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:16px;overflow:hidden;
                 box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0D2137 0%,#1B75BB 100%);
                        padding:36px 40px;text-align:center;">
              <div style="font-size:26px;font-weight:900;color:#ffffff;letter-spacing:4px;">
                🚌 POST BUS MALAWI
              </div>
              <div style="margin-top:14px;display:inline-block;
                           background:rgba(239,68,68,0.2);
                           border:1px solid rgba(239,68,68,0.5);
                           border-radius:20px;padding:6px 18px;">
                <span style="color:#FCA5A5;font-size:13px;font-weight:700;letter-spacing:1px;">
                  BOOKING CANCELLED
                </span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="font-size:17px;font-weight:700;color:#1e293b;margin:0 0 6px 0;">
                Hello, ${toName} 👋
              </p>
              <p style="font-size:14px;color:#64748b;margin:0 0 28px 0;line-height:1.6;">
                Your booking has been successfully cancelled. Here is a summary below.
              </p>

              <!-- Booking ref -->
              <div style="background:#f8fafc;border:1px solid #e2e8f0;
                           border-radius:10px;padding:14px 18px;margin-bottom:24px;">
                <div style="font-size:11px;color:#94a3b8;font-weight:700;letter-spacing:1px;">
                  BOOKING REFERENCE
                </div>
                <div style="font-size:15px;font-weight:800;color:#1e293b;
                             margin-top:4px;font-family:monospace;">
                  #${bookingId}
                </div>
              </div>

              <!-- Trip card -->
              <div style="background:linear-gradient(135deg,#0D2137,#0F2A42);
                           border-radius:14px;padding:24px;margin-bottom:24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="text-align:left;">
                      <div style="font-size:10px;color:rgba(255,255,255,0.45);
                                   font-weight:700;letter-spacing:1.2px;">FROM</div>
                      <div style="font-size:20px;font-weight:900;color:#ffffff;margin-top:2px;">
                        ${from}
                      </div>
                    </td>
                    <td style="text-align:center;">
                      <div style="color:#29ABE2;font-size:22px;">→</div>
                    </td>
                    <td style="text-align:right;">
                      <div style="font-size:10px;color:rgba(255,255,255,0.45);
                                   font-weight:700;letter-spacing:1.2px;">TO</div>
                      <div style="font-size:20px;font-weight:900;color:#ffffff;margin-top:2px;">
                        ${to}
                      </div>
                    </td>
                  </tr>
                </table>
                <div style="height:1px;background:rgba(255,255,255,0.08);margin:18px 0;"></div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:12px;">
                      <div style="font-size:10px;color:rgba(255,255,255,0.4);
                                   font-weight:700;letter-spacing:1px;">TRAVEL DATE</div>
                      <div style="font-size:14px;color:#ffffff;font-weight:700;margin-top:2px;">
                        ${date}
                      </div>
                    </td>
                    <td style="padding-bottom:12px;">
                      <div style="font-size:10px;color:rgba(255,255,255,0.4);
                                   font-weight:700;letter-spacing:1px;">DEPARTURE</div>
                      <div style="font-size:14px;color:#ffffff;font-weight:700;margin-top:2px;">
                        ${departureTime}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font-size:10px;color:rgba(255,255,255,0.4);
                                   font-weight:700;letter-spacing:1px;">BUS NUMBER</div>
                      <div style="font-size:14px;color:#29ABE2;font-weight:700;margin-top:2px;">
                        ${busNumber}
                      </div>
                    </td>
                    <td>
                      <div style="font-size:10px;color:rgba(255,255,255,0.4);
                                   font-weight:700;letter-spacing:1px;">SEAT(S)</div>
                      <div style="font-size:14px;color:#ffffff;font-weight:700;margin-top:2px;">
                        ${seat}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Refund section -->
              <div style="border-radius:12px;padding:20px;margin-bottom:24px;
                           background:#f0fdf4;border:1px solid #bbf7d0;">
                <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#15803d;">
                  REFUND DETAILS
                </div>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                  <tr>
                    <td style="font-size:13px;color:#475569;">Amount Paid</td>
                    <td style="text-align:right;font-size:13px;color:#1e293b;font-weight:700;">
                      ${totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#475569;padding-top:6px;">Refund Amount</td>
                    <td style="text-align:right;font-size:16px;font-weight:900;
                                padding-top:6px;color:#16a34a;">
                      ${refundAmount}
                    </td>
                  </tr>
                </table>
                <div style="margin-top:12px;font-size:12px;color:#15803d;line-height:1.5;">
                  ${refundPolicy}
                </div>
              </div>

              <p style="font-size:12px;color:#94a3b8;margin:0 0 24px 0;">
                Cancelled on: <strong>${cancelledAt}</strong>
              </p>

              <div style="background:#f8fafc;border-radius:10px;
                           padding:16px 18px;border-left:4px solid #29ABE2;">
                <p style="margin:0;font-size:13px;color:#475569;line-height:1.6;">
                  If you did not request this cancellation or have any questions,
                  please contact us at
                  <a href="mailto:support@postbusmalawi.com"
                     style="color:#1B75BB;font-weight:700;">
                    support@postbusmalawi.com
                  </a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;text-align:center;
                        border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#1e293b;">
                Post Bus Malawi
              </p>
              <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">
                Safe, reliable travel across Malawi.<br/>
                This is an automated email — please do not reply directly.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });

  console.log(`✅ Cancellation email sent to ${toEmail}`);
};

module.exports = { sendBookingCancellationEmail };
