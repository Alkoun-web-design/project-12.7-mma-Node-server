// standardizedTestPrep.js
import express from 'express';
// import { isAdmin } from '../middleware/auth.js';


const router = express.Router();

  // Get all standardized test prep
  router.get('/', async (req, res) => {
    try {
      if (!req.app.locals.db) {
        return res.status(500).json({ error: 'Database connection not available' });
      }
      
      const [rows] = await req.app.locals.db.query(
        'SELECT * FROM standardized_test_prep ORDER BY created_at DESC'
      );
      res.json(rows);
    } catch (error) {
      console.error('Error fetching standardized test prep:', error);
      res.status(500).json({ error: 'Failed to fetch standardized test prep' });
    }
  });

  // Create a new standardized test prep
  // router.post('/', isAdmin, async (req, res) => {
  router.post('/', async (req, res) => {

    try {
      if (!req.app.locals.db) {
        return res.status(500).json({ error: 'Database connection not available' });
      }
      
      const { test, age_groups, description, schedule, image_url, is_active } = req.body;
      
      // Validate required fields
      if (!test || !age_groups || !description) {
        return res.status(400).json({ 
          error: 'Missing required fields: test, age_groups, and description are required' 
        });
      }
      
      // Insert new test prep
      const [result] = await req.app.locals.db.query(
        'INSERT INTO standardized_test_prep_page (test, age_groups, description, schedule, image_url, is_active) VALUES (?, ?, ?, ?, ?, ?)',
        [test, JSON.stringify(age_groups), description, schedule || null, image_url || null, is_active !== undefined ? is_active : true]
      );
      
      // Get the newly created test prep
      const [newTestPrep] = await req.app.locals.db.query(
        'SELECT * FROM standardized_test_prep_page WHERE id = ?',
        [result.insertId]
      );
      
      res.status(201).json(newTestPrep[0]);
    } catch (error) {
      console.error('Error creating standardized test prep:', error);
      res.status(500).json({ error: 'Failed to create standardized test prep' });
    }
  });

  // Update a standardized test prep
  // router.put('/:id', isAdmin, async (req, res) => {
  router.put('/:id', async (req, res) => {

    try {
      if (!req.app.locals.db) {
        return res.status(500).json({ error: 'Database connection not available' });
      }
      
      const { id } = req.params;
      const { test, age_groups, description, schedule, image_url, is_active } = req.body;
      
      // Check if the test prep exists
      const [existing] = await req.app.locals.db.query(
        'SELECT * FROM standardized_test_prep_page WHERE id = ?',
        [id]
      );
      
      if (existing.length === 0) {
        return res.status(404).json({ error: 'Standardized test prep not found' });
      }
      
      // Update the test prep
      await req.app.locals.db.query(
        'UPDATE standardized_test_prep_page SET test = ?, age_groups = ?, description = ?, schedule = ?, image_url = ?, is_active = ? WHERE id = ?',
        [test, JSON.stringify(age_groups), description, schedule, image_url, is_active, id]
      );
      
      // Get the updated test prep
      const [updated] = await req.app.locals.db.query(
        'SELECT * FROM standardized_test_prep_page WHERE id = ?',
        [id]
      );
      
      res.json(updated[0]);
    } catch (error) {
      console.error('Error updating standardized test prep:', error);
      res.status(500).json({ error: 'Failed to update standardized test prep' });
    }
  });

  // Delete a standardized test prep
  // router.delete('/:id', isAdmin, async (req, res) => {
  router.delete('/:id', async (req, res) => {
    try {
      if (!req.app.locals.db) {
        return res.status(500).json({ error: 'Database connection not available' });
      }
      
      const { id } = req.params;
      
      // Check if the test prep exists
      const [existing] = await req.app.locals.db.query(
        'SELECT * FROM standardized_test_prep_page WHERE id = ?',
        [id]
      );
      
      if (existing.length === 0) {
        return res.status(404).json({ error: 'Standardized test prep not found' });
      }
      
      // Delete the test prep
      await req.app.locals.db.query(
        'DELETE FROM standardized_test_prep_page WHERE id = ?',
        [id]
      );
      
      res.json({ message: 'Standardized test prep deleted successfully' });
    } catch (error) {
      console.error('Error deleting standardized test prep:', error);
      res.status(500).json({ error: 'Failed to delete standardized test prep' });
    }
  });

export default router;