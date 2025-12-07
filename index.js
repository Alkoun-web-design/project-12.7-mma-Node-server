import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config'
// import mysql from 'mysql2/promise';
// import Database from 'better-sqlite3';
import session from 'express-session';
import { DatabaseSync } from 'node:sqlite';
// import { createClient } from 'redis';
// import { RedisStore } from 'connect-redis';
// import MySQLStore from 'express-mysql-session';
import faqsRouter from './routes/faqs.js';
import pagesRouter from './routes/pages.js';
import subjectsRouter from './routes/subjects.js';
import tutorsRouter from './routes/tutors.js';
import counsellorsRouter from './routes/counsellors.js';
import usersRouter from './routes/users.js';
import schedulesRouter from './routes/schedules.js';
import educationalServicesRouter from './routes/educationalServices.js';
import languagesRouter from './routes/languages.js';
import studentTestimonialsRouter from './routes/studentTestimonials.js';
import adminsRouter from './routes/admins.js';
import authRouter from './routes/auth.js';
import contactRouter from './routes/contact.js';
import studentActivitiesRouter from './routes/studentActivities.js';
import standardizedTestPrepRouter from './routes/standardizedTestPrep.js';
import coachingAreasRouter from './routes/coachingAreas.js';
import pricingPlansRouter from './routes/pricingPlans.js';
import servicePricingRouter from './routes/servicePricing.js';
import academicResourcesRouter from './routes/academicResources.js';
import searchRouter from './routes/search.js';
import crypto  from 'crypto';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));

// Enable CORS with proper configuration
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || process.env.FRONTEND_ORIGIN.includes(origin)) {
      console.log('CORS request allowed for origin:', origin);
      callback(null, origin);
    } else {
      console.error('CORS request blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
// app.options('/.*/', cors());


// Generate a new random secret
const generateNewSecret = () => {
  return crypto.randomBytes(32).toString('hex'); // 32-character hex string
};

// Rotate every 24 hours
let currentSecret = generateNewSecret();
setInterval(() => {
  currentSecret = generateNewSecret();
  console.log('Session secret rotated:', currentSecret);
}, 24 * 60 * 60 * 1000); // 24 hours

// Configure session middleware
app.use(session({
  secret: currentSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.SESSION_SECURE === 'true' || false, 
    httpOnly: true,
    sameSite: process.env.SESSION_SAME_SITE || 'lax',
    maxAge: parseInt(process.env.SESSION_MAX_AGE) // 1 hour 
  },
  // store: sessionStore
}));

// Parse request bodies
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.session);
  next()
})

// SQL Database connection
// const db = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'mma1',
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// SQLite Database connection
// const db = new Database('./new-db.db');
const fileDb = new DatabaseSync('./db/new-db.db');
// db.pragma('journal_mode = WAL');

app.locals.db = fileDb;

// Test database connection
// db.getConnection()
//   .then(() => console.log('Connected to SQL database'))
//   .catch(err => console.error('Database connection error:', err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Mount routers
app.use('/api/faqs', faqsRouter);
app.use('/api/pages', pagesRouter);
app.use('/api/subjects', subjectsRouter);
app.use('/api/tutors', tutorsRouter);
app.use('/api/counsellors', counsellorsRouter);
app.use('/api/users', usersRouter);
app.use('/api/schedules', schedulesRouter);
app.use('/api/educational-services', educationalServicesRouter);
app.use('/api/languages', languagesRouter);
app.use('/api/student-testimonials', studentTestimonialsRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);
app.use('/api/student-activities', studentActivitiesRouter);
app.use('/api/standardized-test-prep', standardizedTestPrepRouter);
app.use('/api/coaching-areas', coachingAreasRouter);
app.use('/api/pricing-plans', pricingPlansRouter);
app.use('/api/service-pricing', servicePricingRouter);
app.use('/api/academic-resources', academicResourcesRouter);
// ... other routes ...
app.use('/api/search', searchRouter);

// Start server
app.listen(port, async () => {
  // await setupTransporter();
  // console.log(`Server running on port ${port}`);
  
  // Log session configuration
  console.log('Session configuration:');
  // console.log(`- Store type: ${process.env.SESSION_STORE || 'redis'}`);
  console.log(`- Secure cookies: ${process.env.SESSION_SECURE === 'true' || false}`);
  console.log(`- SameSite: ${process.env.SESSION_SAME_SITE || 'lax'}`);
  
});