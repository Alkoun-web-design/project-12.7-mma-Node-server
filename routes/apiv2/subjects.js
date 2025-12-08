// subjects.js
import express from 'express';

const router = express.Router();

// Get all subjects
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // const [rows] = await req.app.locals.db.query('SELECT * FROM subjects ORDER BY name');
    const rows = req.app.locals.db.prepare('SELECT * FROM subjects ORDER BY name');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// Get subject by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // const [rows] = await req.app.locals.db.query('SELECT * FROM subjects WHERE id = ?', [req.params.id]);

    const rows = req.app.locals.db.prepare('SELECT * FROM subjects WHERE id = ?');
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    res.json(rows.get([req.params.id]));
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({ error: 'Failed to fetch subject' });
  }
});

// Create a new subject
router.post('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { name, description, grade_level, is_active } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ 
        error: 'Missing required fields: name is required' 
      });
    }
    
    // Insert new subject
    const [result] = await req.app.locals.db.query(
      'INSERT INTO subjects (name, description, grade_level, is_active) VALUES (?, ?, ?, ?)',
      [name, description || null, grade_level || null, is_active !== undefined ? is_active : true]
    );
    
    // Get the newly created subject
    const [newSubject] = await req.app.locals.db.query(
      'SELECT * FROM subjects WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newSubject[0]);
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({ error: 'Failed to create subject' });
  }
});

// Update a subject
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { name, description, grade_level, is_active } = req.body;
    
    // Check if the subject exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM subjects WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    // Update the subject
    await req.app.locals.db.query(
      'UPDATE subjects SET name = ?, description = ?, grade_level = ?, is_active = ? WHERE id = ?',
      [name, description, grade_level, is_active, id]
    );
    
    // Get the updated subject
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM subjects WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ error: 'Failed to update subject' });
  }
});

// Delete a subject
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the subject exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM subjects WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    // Delete the subject
    await req.app.locals.db.query(
      'DELETE FROM subjects WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ error: 'Failed to delete subject' });
  }
});

export default router;