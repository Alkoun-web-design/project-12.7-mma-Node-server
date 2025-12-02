// coachingAreas.js
import express from 'express';
const router = express.Router();

/**
 * Get all coaching areas
 */
router.get('/', async (req, res) => {
  try {
    // const [rows] = await req.app.locals.db.query(
    //   'SELECT * FROM coaching_areas ORDER BY title ASC'
    // );
    const rows = req.app.locals.db.prepare(
      'SELECT * FROM coaching_areas ORDER BY title ASC'
    );
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching coaching areas:', error);
    res.status(500).json({ error: 'Failed to fetch coaching areas' });
  }
});

/**
 * Get coaching area by ID
 */
router.get('/:id', async (req, res) => {
  try {
    // const [rows] = await req.app.locals.db.query(
    //   'SELECT * FROM coaching_areas WHERE id = $1',
    //   [req.params.id]
    // );

    const rows = req.app.locals.db.prepare(
      'SELECT * FROM coaching_areas WHERE id = $1',
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Coaching area not found' });
    }
    
    res.json(rows.get(req.params.id));
  } catch (error) {
    console.error('Error fetching coaching area:', error);
    res.status(500).json({ error: 'Failed to fetch coaching area' });
  }
});

/**
 * Create new coaching area
 */
router.post('/', async (req, res) => {
  const { title, description, benefits, logo } = req.body;
  
  // Validate required fields
  if (!title || !description || !benefits) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      requiredFields: ['title', 'description', 'benefits']
    });
  }
  
  try {
    // const [rows] = await req.app.locals.db.query(
    //   `INSERT INTO coaching_areas (title, description, benefits, logo)
    //    VALUES ($1, $2, $3, $4)
    //    RETURNING *`,
    //   [title, description, JSON.stringify(benefits), logo]
    // );

    const rows = req.app.locals.db.prepare(
      `INSERT INTO coaching_areas (title, description, benefits, logo)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
    );
    
    // res.status(201).json(rows[0]);
    res.status(201).json(rows.get(title, description, JSON.stringify(benefits), logo));
  } catch (error) {
    console.error('Error creating coaching area:', error);
    res.status(500).json({ error: 'Failed to create coaching area' });
  }
});

/**
 * Update coaching area
 */
router.put('/:id', async (req, res) => {
  const { title, description, benefits, logo } = req.body;
  
  try {
    const [rows] = await req.app.locals.db.query(
      `UPDATE coaching_areas 
       SET title = $1, 
           description = $2, 
           benefits = $3,
           logo = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [title, description, JSON.stringify(benefits), logo, req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Coaching area not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating coaching area:', error);
    res.status(500).json({ error: 'Failed to update coaching area' });
  }
});

/**
 * Delete coaching area
 */
router.delete('/:id', async (req, res) => {
  try {
    const [rows] = await req.app.locals.db.query(
      'DELETE FROM coaching_areas WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Coaching area not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting coaching area:', error);
    res.status(500).json({ error: 'Failed to delete coaching area' });
  }
});

export default router;