// educationalServices.js
import express from 'express';
const router = express.Router();

// Import database connection
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a new database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mydatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Get all educational services
router.get('/', async (req, res) => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    
    // Execute query
    const [rows] = await connection.query('SELECT * FROM educational_services');
    
    // Release connection back to pool
    connection.release();
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching educational services:', error);
    res.status(500).json({ error: 'Failed to fetch educational services' });
  }
});

export default router;