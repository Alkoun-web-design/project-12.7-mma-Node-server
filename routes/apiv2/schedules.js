// classroom_schedules.js
import express from 'express';

const router = express.Router();

// Get all classroom_schedules
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // const [rows] = await req.app.locals.db.query('SELECT * FROM classroom_schedules ORDER BY created_at DESC');
    const rows = req.app.locals.db.prepare('SELECT * FROM classroom_schedules ORDER BY created_at DESC');
    const data = rows.all();
    res.json(data);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// Get schedule by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // const [rows] = await req.app.locals.db.query('SELECT * FROM classroom_schedules WHERE id = ?', [req.params.id]);
    const rows = req.app.locals.db.prepare('SELECT * FROM classroom_schedules WHERE id = ?');

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    res.json(rows.get(req.params.id));
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// Create a new schedule
router.post('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { title, description, start_time, end_time, location, staff_id } = req.body;
    
    // Validate required fields
    if (!title || !start_time || !end_time) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, start_time, and end_time are required' 
      });
    }
    
    // Insert new schedule
    const [result] = await req.app.locals.db.query(
      'INSERT INTO classroom_schedules (title, description, start_time, end_time, location, staff_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description || null, start_time, end_time, location || null, staff_id || null]
    );
    
    // Get the newly created schedule
    const [newSchedule] = await req.app.locals.db.query(
      'SELECT * FROM classroom_schedules WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newSchedule[0]);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

// Update a schedule
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { title, description, start_time, end_time, location, staff_id } = req.body;
    
    // Check if the schedule exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM classroom_schedules WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    // Update the schedule
    await req.app.locals.db.query(
      'UPDATE classroom_schedules SET title = ?, description = ?, start_time = ?, end_time = ?, location = ?, staff_id = ? WHERE id = ?',
      [title || existing[0].title,
       description !== undefined ? description : existing[0].description,
       start_time !== undefined ? start_time : existing[0].start_time,
       end_time !== undefined ? end_time : existing[0].end_time,
       location !== undefined ? location : existing[0].location,
       staff_id !== undefined ? staff_id : existing[0].staff_id,
       id]
    );
    
    // Get the updated schedule
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM classroom_schedules WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ error: 'Failed to update schedule' });
  }
});

// Delete a schedule
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the schedule exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM classroom_schedules WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    // Delete the schedule
    await req.app.locals.db.query(
      'DELETE FROM classroom_schedules WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

export default router;