import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initStudentActivities() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  });

  try {
    // Read and execute the SQL file
    const sql = fs.readFileSync(
      path.join(__dirname, 'migrations', 'create_student_activities.sql'),
      'utf8'
    );

    // Split the SQL file into individual statements
    const statements = sql.split(';').filter(statement => statement.trim());

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }

    console.log('Student activities table and sample data created successfully');
  } catch (error) {
    console.error('Error initializing student activities:', error);
  } finally {
    await connection.end();
  }
}

initStudentActivities(); 