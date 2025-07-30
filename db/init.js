import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Import init_pricing without executing it immediately
import './init_pricing.js';
import { hashPassword, generateSalt } from '../middleware/auth.js';  // Import hashPassword function

dotenv.config();

// Create connection
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
});

// Create database if it doesn't exist
await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'mydatabase'}`);
await connection.query(`USE ${process.env.DB_NAME || 'mydatabase'}`);

// Drop existing tables if they exist
await connection.query('DROP TABLE IF EXISTS user_sessions, staff, subjects, staff_subjects, students');

// Create tables in proper order to handle foreign key dependencies
console.log('Creating database schema...');

// Create user_sessions table for persistent session storage
await db.query(`
  CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    expires_at DATETIME NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES staff(user_id) ON DELETE CASCADE,
    UNIQUE (session_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`);

// Create indexes for better query performance
await db.query(`
  CREATE INDEX idx_user_sessions_user_expires ON user_sessions(user_id, expires_at);
`);
await db.query(`
  CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
`);

// Create stored procedure for session cleanup
await db.query(`
  DELIMITER //
  CREATE PROCEDURE CleanupExpiredSessions()
  BEGIN
    DECLARE deleted_sessions INT;
    
    -- Delete expired and revoked sessions
    DELETE FROM user_sessions 
    WHERE expires_at < NOW() OR is_revoked = TRUE;
    
    -- Get number of deleted sessions
    SELECT ROW_COUNT() INTO deleted_sessions;
    
    -- Return result
    SELECT deleted_sessions AS expiredSessionsDeleted;
  END //
  DELIMITER ;
`);

// Create function to check session validity
await db.query(`
  DELIMITER //
  CREATE FUNCTION ValidateSession(sessionId VARCHAR(255))
  RETURNS BOOLEAN
  BEGIN
    DECLARE validSession INT;
    
    SELECT COUNT(*) INTO validSession
    FROM user_sessions
    WHERE session_id = sessionId
      AND expires_at > NOW()
      AND is_revoked = FALSE;
    
    RETURN validSession > 0;
  END //
  DELIMITER ;
`);

// Create event to run session cleanup hourly
await db.query(`
  CREATE EVENT IF NOT EXISTS hourly_session_cleanup
  ON SCHEDULE EVERY 1 HOUR
  STARTS CURRENT_DATE + INTERVAL 1 HOUR
  DO
  CALL CleanupExpiredSessions();
`);

// Enable event scheduler
try {
  await db.query(`SET GLOBAL event_scheduler = ON;`);
} catch (error) {
  console.error('Error enabling MySQL event scheduler:', error);
}

// Create staff table
await connection.query(`
  CREATE TABLE staff (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'tutor', 'counselor') DEFAULT 'tutor',
    salt VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`);

// Create subjects table
await connection.query(`
  CREATE TABLE subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    grade_level VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`);

// Create staff_subjects junction table
await connection.query(`
  CREATE TABLE staff_subjects (
    staff_id INT NOT NULL,
    subject_id INT NOT NULL,
    PRIMARY KEY (staff_id, subject_id),
    FOREIGN KEY (staff_id) REFERENCES staff(user_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`);

// Create students table
await connection.query(`
  CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_name VARCHAR(100),
    age INT,
    grade_level VARCHAR(50),
    interests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`);

// Add test data with hashed passwords
const johnSmithPassword = 'johnspass123';  // Test password for John Smith
const sarahJohnsonPassword = 'sarahpass123';  // Test password for Sarah Johnson

const johnSmithSalt = generateSalt();
const johnSmithHash = hashPassword(johnSmithPassword, johnSmithSalt);
const sarahJohnsonSalt = generateSalt();
const sarahJohnsonHash = hashPassword(sarahJohnsonPassword, sarahJohnsonSalt);

// Run the initialization
async function initializeDatabase() {
  try {
    // Clear existing staff data first
    await connection.query('TRUNCATE TABLE staff');

    // Insert test data with hashed passwords
    await connection.query(`
      INSERT INTO staff 
      (name, email, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, avatar_url, role, password, salt) 
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        // John Smith's data
        'John Smith', 
        'john.smith@example.com', 
        'Experienced mathematics tutor with a passion for helping students understand complex concepts.', 
        'MSc in Mathematics, University of Cambridge', 
        'Mathematics, Calculus, Statistics', 
        'Interactive and student-centered approach', 
        'English, Spanish', 
        '5 years teaching experience at various institutions', 
        'Certified Mathematics Teacher', 
        'Outstanding Teacher Award 2022', 
        'https://images.pexels.com/photos/5212640/pexels-photo-5212640.jpeg', 
        'tutor', 
        johnSmithHash,
        johnSmithSalt,
        
        // Sarah Johnson's data
        'Sarah Johnson', 
        'sarah.johnson@example.com', 
        'Dedicated science educator with expertise in biology and chemistry.', 
        'PhD in Biology, Stanford University', 
        'Biology, Chemistry, Environmental Science', 
        'Hands-on learning with real-world applications', 
        'English, French', 
        '8 years teaching experience', 
        'Advanced Biology Certification', 
        'Research Excellence Award', 
        'https://images.pexels.com/photos/5212640/pexels-photo-5212640.jpeg', 
        'tutor', 
        sarahJohnsonHash,
        sarahJohnsonSalt
      ]
    );

    // Check if annual pricing fields exist in pricing_plans table
    const [columns] = await connection.query(`DESCRIBE pricing_plans`);
    const hasAnnualPrice = columns.some(col => col.Field === 'annual_price');
    const hasAnnualDescription = columns.some(col => col.Field === 'annual_description');

    if (!hasAnnualPrice || !hasAnnualDescription) {
      // Add annual pricing fields if they don't exist
      if (!hasAnnualPrice) {
        await connection.query(`ALTER TABLE pricing_plans ADD COLUMN annual_price VARCHAR(50) AFTER price`);
      }
      if (!hasAnnualDescription) {
        await connection.query(`ALTER TABLE pricing_plans ADD COLUMN annual_description TEXT AFTER description`);
      }
      
      // Update sample data if needed
      await connection.query(`
        UPDATE pricing_plans 
        SET 
          annual_price = CASE id
            WHEN 1 THEN '$1999/year'
            WHEN 2 THEN '$4999/year'
            WHEN 3 THEN '$8999/year'
            ELSE NULL
          END,
          annual_description = CASE id
            WHEN 1 THEN 'For students needing occasional help billed annually'
            WHEN 2 THEN 'Our most popular plan for regular students billed annually'
            WHEN 3 THEN 'Comprehensive support for dedicated students billed annually'
            ELSE NULL
          END
      `);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the initialization
initializeDatabase().catch(console.error);