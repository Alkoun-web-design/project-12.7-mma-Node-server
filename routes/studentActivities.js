// studentActivities.js
import express from 'express';

const router = express.Router();

// Get all student activities
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM student_activities ORDER BY name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching student activities:', error);
    res.status(500).json({ error: 'Failed to fetch student activities' });
  }
});

// Get student activity by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM student_activities WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student activity not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching student activity:', error);
    res.status(500).json({ error: 'Failed to fetch student activity' });
  }
});

// Create a new student activity
router.post('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { title, description, age_groups, schedule, image_url, is_active } = req.body;
    
    // Validate required fields
    if (!title || !description || !age_groups) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, description, and age_groups are required' 
      });
    }
    
    // Insert new student activity
    const [result] = await req.app.locals.db.query(
      'INSERT INTO student_activities (title, description, age_groups, schedule, image_url, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, JSON.stringify(age_groups), schedule || null, image_url || null, is_active !== undefined ? is_active : true]
    );
    
    // Get the newly created student activity
    const [newActivity] = await req.app.locals.db.query(
      'SELECT * FROM student_activities WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newActivity[0]);
  } catch (error) {
    console.error('Error creating student activity:', error);
    res.status(500).json({ error: 'Failed to create student activity' });
  }
});

// Update a student activity
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { title, description, age_groups, schedule, image_url, is_active } = req.body;
    
    // Check if the student activity exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM student_activities WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Student activity not found' });
    }
    
    // Update the student activity
    await req.app.locals.db.query(
      'UPDATE student_activities SET title = ?, description = ?, age_groups = ?, schedule = ?, image_url = ?, is_active = ? WHERE id = ?',
      [title, description, JSON.stringify(age_groups), schedule, image_url, is_active, id]
    );
    
    // Get the updated student activity
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM student_activities WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating student activity:', error);
    res.status(500).json({ error: 'Failed to update student activity' });
  }
});

// Delete a student activity
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the student activity exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM student_activities WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Student activity not found' });
    }
    
    // Delete the student activity
    await req.app.locals.db.query(
      'DELETE FROM student_activities WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'Student activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting student activity:', error);
    res.status(500).json({ error: 'Failed to delete student activity' });
  }
});

export default router;