// init_pricing.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mydatabase',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
};

async function initializePricing() {
  try {
    // Create database connection
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port
    });

    // Import sample data
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { pricingPlans, servicesPricing } = await import(path.join(__dirname, '../../src/sampleData.js'));

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.query(`USE ${dbConfig.database}`);
    
    // Read the SQL schema file
    console.log('Reading pricing plans and service pricing data...');
    
    // Use the correct path to sampleData.js in src directory
    const __dirname = path.dirname(__filename);

    // Try multiple possible paths to find sampleData.js
    let fileContent;
    try {
      // First try the direct path relative to the current file
      fileContent = await fs.readFile(path.join(__dirname, '../../src/sampleData.js'), 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        try {
          // If not found, try one level up
          fileContent = await fs.readFile(path.join(__dirname, '../../../src/sampleData.js'), 'utf8');
        } catch (err2) {
          if (err2.code === 'ENOENT') {
            // If still not found, try the absolute path
            fileContent = await fs.readFile('C:/Users/hassa/Webdev/project-11.7-bolt/src/sampleData.js', 'utf8');
          } else {
            throw err2;
          }
        }
      } else {
        throw err;
      }
    }
    
    // This is a simplified approach - in production you would want more robust error handling
    // Extract pricingPlans and servicesPricing arrays from sampleData.js
    // In a real scenario, we would use proper parsing or import the file directly
    const result = {};
    eval(data.replace(/^.*=\s*(\[.*\])/ms, 'result.data = $1'));
    const { pricingPlans, servicesPricing } = result;
    
    // Insert pricing plans
    if (pricingPlans && pricingPlans.length > 0) {
      console.log(`Inserting ${pricingPlans.length} pricing plans...`);
      
      // Delete existing plans if we're not in production
      if (process.env.NODE_ENV !== 'production') {
        await connection.query('DELETE FROM pricing_plans');
      }
      
      for (const plan of pricingPlans) {
        const { name, description, price, features, popular, linkTo } = plan;
        
        // Insert new plan
        await connection.query(
          'INSERT INTO pricing_plans (name, description, price, features, popular, link_to, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            name,
            description,
            price,
            JSON.stringify(features),
            popular || false,
            linkTo,
            0 // Default order index, will be updated later based on array position
          ]
        );
      }
      
      // Update order indexes based on original array order
      for (let i = 0; i < pricingPlans.length; i++) {
        await connection.query(
          'UPDATE pricing_plans SET order_index = ? WHERE name = ?',
          [i + 1, pricingPlans[i].name]
        );
      }
    }
    
    // Insert service pricing
    if (servicesPricing && servicesPricing.length > 0) {
      console.log(`Inserting ${servicesPricing.length} service pricings...`);
      
      // Delete existing plans if we're not in production
      if (process.env.NODE_ENV !== 'production') {
        await connection.query('DELETE FROM service_pricing');
      }
      
      for (const service of servicesPricing) {
        const { service: serviceName, description, individual, package: packagePrice, linkTo } = service;
        
        // Insert new service pricing
        await connection.query(
          'INSERT INTO service_pricing (service, description, individual, package, link_to, order_index) VALUES (?, ?, ?, ?, ?, ?)',
          [
            serviceName,
            description,
            individual,
            packagePrice,
            linkTo,
            0 // Default order index, will be updated later based on array position
          ]
        );
      }
      
      // Update order indexes based on original array order
      for (let i = 0; i < servicesPricing.length; i++) {
        await connection.query(
          'UPDATE service_pricing SET order_index = ? WHERE service = ?',
          [i + 1, servicesPricing[i].service]
        );
      }
    }
    
    console.log('Pricing data initialized successfully');
    await connection.end();
  } catch (error) {
    console.error('Error initializing pricing data:', error);
    process.exit(1);
  }
}

// Run the initialization
initializePricing();