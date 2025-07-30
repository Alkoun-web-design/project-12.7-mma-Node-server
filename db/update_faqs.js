import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateFaqs() {
  let connection;
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: 'mma1',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    });

    // Read and execute update_faqs.sql
    const sqlPath = path.join(__dirname, 'update_faqs.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }

    console.log('FAQs tables updated successfully');
  } catch (err) {
    console.error('Error updating FAQs tables:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the update
updateFaqs().catch(console.error); 