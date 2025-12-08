// contact.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE || 'smtp.hostinger.com',
  port: process.env.EMAIL_PORT || 465,
  secure: process.env.EMAIL_SECURE === 'true' || true,
  auth: {
    user: process.env.ENQUIRIES_USER,
    pass: process.env.ENQUIRIES_PASS
  }
});

// Contact form submission endpoint
// router.post('/', async (req, res) => {
//   try {
//     // Validate request body
//     const { error, value } = req.app.locals.contactSchema.validate(req.body);
    
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
    
//     const { name, email, phone, subject, message, interest } = value;
    
//     // Email options for admin notification
//     const mailOptions = {
//       from: process.env.EMAIL_USER || 'no-reply@example.com',
//       to: process.env.CONTACT_EMAIL || 'admin@example.com',
//       subject: `New Contact Form Submission - ${subject}`,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
//         <p><strong>Subject:</strong> ${subject}</p>
//         ${interest ? `<p><strong>Interest:</strong> ${interest}</p>` : ''}
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `
//     };
    
//     // Send email to admin
//     await req.app.locals.transporter.sendMail(mailOptions);
    
//     // Optional: Send confirmation email to user
//     const userConfirmationMail = {
//       from: process.env.EMAIL_USER || 'no-reply@example.com',
//       to: email,
//       subject: 'Thank you for contacting us',
//       html: `
//         <h2>Thank You for Contacting Us</h2>
//         <p>Dear ${name},</p>
//         <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
//         <p>Best regards,</p>
//         <p>Mind Muscles Academy Team</p>
//       `
//     };
    
//     // Only send confirmation if not in test mode
//     if (process.env.SEND_CONFIRMATION_EMAIL !== 'false') {
//       await req.app.locals.transporter.sendMail(userConfirmationMail);
//     }
    
//     // Store contact submission in database
//     if (!req.app.locals.db) {
//       return res.status(500).json({ error: 'Database connection not available' });
//     }
    
//     await req.app.locals.db.query(
//       'INSERT INTO contact_submissions (name, email, phone, subject, message, interest) VALUES (?, ?, ?, ?, ?, ?)',
//       [name, email, phone, subject, message, interest]
//     );
    
//     res.json({ message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error('Contact form submission error:', error);
//     res.status(500).json({ error: 'Failed to process contact form' });
//   }
// });



router.post('/signup-form', async (req, res) => {
    console.log('request for email recieved')
    const {serviceType, formData} = req.body
    console.log(formData);
    
    // if (serviceType === 'Home-schooling') {
    //     const { studentName, studentAge, grade, parentName, email, phone, startDate, subjects, specialNeeds, additionalInfo } = req.body.formFields;
    // } else if (serviceType === 'One on One') {
    //     const { studentName, studentAge, grade, subject, goalDescription, parentName, email, phone, preferredSchedule, additionalInfo } = req.body;
    // } else if (serviceType === 'Combined Classes') {
    //     const { studentName, studentAge, grade, classInterest, goalDescription, parentName, email, phone, preferredSchedule, additionalInfo } = req.body;
    // } else if (serviceType === 'Student Coaching') {
    //     const { studentName, studentAge, grade, coachingType, currentChallenges, parentName, email, phone, additionalInfo } = req.body;  
    // } else if (serviceType === 'Standardized Test Prep') {
    //     const { studentName, studentAge, grade, testType, specificTest, testDate, parentName, email, phone, currentScores, goalScores, additionalInfo } = req.body;  
    // } else if (serviceType === 'Student Activities') {
    //     const { studentName, studentAge, grade, clubInterest, parentName, email, phone, availability, studentInterests, additionalInfo } = req.body;
    // } else if (serviceType === 'Academic Resources') {
    //     const { name, email, phone, role, gradeLevel, resourcesInterest, subjects, specificNeeds, additionalInfo } = req.body;
    // } else if (serviceType === 'Language Learning') {
    //     const { studentName, studentAge, language, otherLanguage, currentLevel, learningGoals, parentName, email, phone, preferredSchedule, additionalInfo } = req.body;
    // } else {
    //     res.status(300).json({ error: 'Invalid service type' });
    //     return;
    // }
  const fieldsHTML = Object.entries(formData)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join('');    
  try{
      const info = await transporter.sendMail({
        from: '"Mind Muscles Academy" <enquiries@mindmuscles.net>', // sender address
        to: "enquiries@mindmuscles.net", // list of receivers
        subject: `Interest in ${serviceType}, from ${formData.studentName | formData.name}`, // Subject line
        html: `<b>Application for ${serviceType}</b>
          <div>
              <ul>${fieldsHTML}</ul>
          </div>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
});

router.post('/enquiry-form', async (req, res) => {
    const { name, email, phone, interest, subject, message } = req.body;
    try{
      const info = await transporter.sendMail({
      from: '"Mind Muscles Academy" <enquiries@mindmuscles.net>', // sender address
      to: "enquiries@mindmuscles.net", // list of receivers
      subject: `${subject}, sent by ${name}, `, // Subject line
      html: `<b>Contact Form</b>
        <div>
            <ul>
              <li>Name: ${name}</li>
              <li>Email: ${email}</li>
              <li>Phone Number: ${phone}</li>
              <li>Subject: ${subject}</li>
              <li>Interested In: ${interest}</li>
              <li>Message: ${message}</li>
            </ul>
        </div>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email' });
    }
});

// await transporter.verify();
// console.log("Server is ready to take our messages");


export default router;