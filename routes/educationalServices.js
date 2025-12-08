// educationalServices.js
import express from 'express';
const router = express.Router();

// Get all educational services
router.get('/', async (req, res) => {
  try {

    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const rows = req.app.locals.db.prepare('SELECT * FROM educational_services');

    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching educational services:', error);
    res.status(500).json({ error: 'Failed to fetch educational services' });
  }
});

export default router;