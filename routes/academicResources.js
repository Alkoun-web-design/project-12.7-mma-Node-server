import express from 'express';
const router = express.Router();

// Get all academic resources
router.get('/', async (req, res) => {
  try {
    // const [rows] = await req.app.locals.db.query('SELECT * FROM academic_resources');
  const rows = req.app.locals.db.prepare('SELECT * FROM academic_resources');
    // Ensure features are parsed as JSON if they're stored as strings
    const processedRows = rows.map(row => ({
      ...row,
      features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features
    }));
    // res.json(processedRows);
    const data = processedRows.all() 
    res.json(data);
  } catch (error) {
    console.error('Error fetching academic resources:', error);
    res.status(500).json({ error: 'Failed to fetch academic resources' });
  }
});

// Get a single academic resource by ID
router.get('/:id', async (req, res) => {
  try {
    // const [rows] = await req.app.locals.db.query('SELECT * FROM academic_resources WHERE id = ?', [req.params.id]);
    const rows = req.app.locals.db.prepare('SELECT * FROM academic_resources WHERE id = ?');

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    // res.json(rows[0]);
    res.json(rows.get(req.params.id));
  } catch (error) {
    console.error('Error fetching academic resource:', error);
    res.status(500).json({ error: 'Failed to fetch academic resource' });
  }
});

// Create a new academic resource
router.post('/', async (req, res) => {
  try {
    const { category_title, description, icon, features } = req.body;
    
    if (!category_title || !description || !icon || !features) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await req.app.locals.db.query(
      'INSERT INTO academic_resources (category_title, description, icon, features) VALUES (?, ?, ?, ?)',
      [category_title, description, icon, JSON.stringify(features)]
    );

    const [newResource] = await req.app.locals.db.query('SELECT * FROM academic_resources WHERE id = ?', [result.insertId]);
    res.status(201).json(newResource[0]);
  } catch (error) {
    console.error('Error creating academic resource:', error);
    res.status(500).json({ error: 'Failed to create academic resource' });
  }
});

// Update an existing academic resource
router.put('/:id', async (req, res) => {
  try {
    const { category_title, description, icon, features } = req.body;
    
    if (!category_title || !description || !icon || !features) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [existing] = await req.app.locals.db.query('SELECT * FROM academic_resources WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    await req.app.locals.db.query(
      'UPDATE academic_resources SET category_title = ?, description = ?, icon = ?, features = ? WHERE id = ?',
      [category_title, description, icon, JSON.stringify(features), req.params.id]
    );

    const [updated] = await req.app.locals.db.query('SELECT * FROM academic_resources WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating academic resource:', error);
    res.status(500).json({ error: 'Failed to update academic resource' });
  }
});

// Delete an academic resource
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await req.app.locals.db.query('DELETE FROM academic_resources WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting academic resource:', error);
    res.status(500).json({ error: 'Failed to delete academic resource' });
  }
});

export default router;