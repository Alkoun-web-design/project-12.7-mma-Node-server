// signup.js
import express from 'express';

const router = express.Router();

// Signup form submission endpoint
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = req.app.locals.signupSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const { serviceType, studentName, studentAge } = value;
    
    // Email options for admin notification
    const mailOptions = {
      from: process.env.EMAIL_USER || 'no-reply@example.com',
      to: process.env.SIGNUP_EMAIL || 'admin@example.com',
      subject: `New Signup Request - ${serviceType}`,
      html: `
        <h2>New Signup Request</h2>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        ${studentName ? `<p><strong>Student Name:</strong> ${studentName}</p>` : ''}
        ${studentAge ? `<p><strong>Student Age:</strong> ${studentAge}</p>` : ''}
        <p><strong>Additional Information:</strong></p>
        <ul>
        ${Object.entries(value)
          .filter(([key]) => !['serviceType', 'studentName', 'studentAge'].includes(key))
          .map(([key, value]) => `<li><strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> ${value || 'N/A'}</li>`)
          .join('')}
        </ul>
      `
    };
    
    // Send email to admin
    await req.app.locals.transporter.sendMail(mailOptions);
    
    // Optional: Send confirmation email to user
    const userConfirmationMail = {
      from: process.env.EMAIL_USER || 'no-reply@example.com',
      to: value.parentEmail || value.email,
      subject: 'Thank you for signing up',
      html: `
        <h2>Thank You for Signing Up</h2>
        <p>Dear Parent,</p>
        <p>Thank you for expressing interest in our ${serviceType} program. We have received your application and will get back to you as soon as possible.</p>
        ${studentName ? `<p><strong>Student Name:</strong> ${studentName}</p>` : ''}
        ${studentAge ? `<p><strong>Student Age:</strong> ${studentAge}</p>` : ''}
        <p>We look forward to helping your child succeed!</p>
        <p>Best regards,</p>
        <p>Mind Muscles Academy Team</p>
      `
    };
    
    await req.app.locals.transporter.sendMail(userConfirmationMail);
    
    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup submission error:', error);
    res.status(500).json({ error: 'Failed to process signup submission' });
  }
});

export default router;