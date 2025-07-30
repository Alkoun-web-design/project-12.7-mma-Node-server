// languages.js
import express from 'express';

const router = express.Router();

// Get all languages
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM languages ORDER BY name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

// Get language by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM languages WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Language not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching language:', error);
    res.status(500).json({ error: 'Failed to fetch language' });
  }
});

// Create a new language
router.post('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { name, code, is_active } = req.body;
    
    // Validate required fields
    if (!name || !code) {
      return res.status(400).json({ 
        error: 'Missing required fields: name and code are required' 
      });
    }
    
    // Insert new language
    const [result] = await req.app.locals.db.query(
      'INSERT INTO languages (name, code, is_active) VALUES (?, ?, ?)',
      [name, code, is_active !== undefined ? is_active : true]
    );
    
    // Get the newly created language
    const [newLanguage] = await req.app.locals.db.query(
      'SELECT * FROM languages WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newLanguage[0]);
  } catch (error) {
    console.error('Error creating language:', error);
    res.status(500).json({ error: 'Failed to create language' });
  }
});

// Update a language
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { name, code, is_active } = req.body;
    
    // Check if the language exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM languages WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Language not found' });
    }
    
    // Update the language
    await req.app.locals.db.query(
      'UPDATE languages SET name = ?, code = ?, is_active = ? WHERE id = ?',
      [name || existing[0].name,
       code || existing[0].code,
       is_active !== undefined ? is_active : existing[0].is_active,
       id]
    );
    
    // Get the updated language
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM languages WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating language:', error);
    res.status(500).json({ error: 'Failed to update language' });
  }
});

// Delete a language
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the language exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM languages WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Language not found' });
    }
    
    // Delete the language
    await req.app.locals.db.query(
      'DELETE FROM languages WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    console.error('Error deleting language:', error);
    res.status(500).json({ error: 'Failed to delete language' });
  }
});

export default router;