// faqs.js
import express from 'express';

const router = express.Router();

// Get all FAQs
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // const [rows] = await req.app.locals.db.query('SELECT * FROM faqs ORDER BY category, question');
    const rows = req.app.locals.db.prepare('SELECT * FROM faqs ORDER BY category, question');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get FAQs by category
router.get('/category/:category', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // const [rows] = await req.app.locals.db.query('SELECT * FROM faqs WHERE category = ? ORDER BY question', [req.params.category]);
    const rows = req.app.locals.db.prepare('SELECT * FROM faqs WHERE category = ? ORDER BY question');
    res.json(rows.get(req.params.category));
  } catch (error) {
    console.error('Error fetching FAQs by category:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs by category' });
  }
});

// Create a new FAQ
router.post('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { question, answer, category } = req.body;
    
    // Validate required fields
    if (!question || !answer || !category) {
      return res.status(400).json({ 
        error: 'Missing required fields: question, answer, and category are required' 
      });
    }
    
    // Insert new FAQ
    const [result] = await req.app.locals.db.query(
      'INSERT INTO faqs (question, answer, category) VALUES (?, ?, ?)',
      [question, answer, category]
    );
    
    // Get the newly created FAQ
    const [newFAQ] = await req.app.locals.db.query(
      'SELECT * FROM faqs WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newFAQ[0]);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

// Update a FAQ
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { question, answer, category } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM faqs WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      'UPDATE faqs SET question = ?, answer = ?, category = ? WHERE id = ?',
      [question || existing[0].question,
       answer || existing[0].answer,
       category || existing[0].category,
       id]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM faqs WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

// Delete a FAQ
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM faqs WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    
    // Delete the FAQ
    await req.app.locals.db.query(
      'DELETE FROM faqs WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

export default router;