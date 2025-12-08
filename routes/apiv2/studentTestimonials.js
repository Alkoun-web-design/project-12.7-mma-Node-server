// studentTestimonials.js
import express from 'express';

const router = express.Router();

// Get all student_testimonials
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // Check if success_stories column exists
    // const testimonialsQuery = await req.app.locals.db.query("SHOW COLUMNS FROM student_testimonials LIKE 'success_stories'");
    const testimonialsQuery = req.app.locals.db.prepare("SHOW COLUMNS FROM student_testimonials LIKE 'success_stories'");
    const includeSuccessStories = testimonialsQuery.length > 0;
    
    let query = 'SELECT id, student_name, testimonial, service_id';
    
    // If success_stories column exists, include it in the query
    if (includeSuccessStories) {
      query += ', success_stories';
    }
    
    query += ' FROM student_testimonials ORDER BY student_name';
    
    const rows = req.app.locals.db.prepare(query);
    const data = rows.all();
    res.json(data);
  } catch (error) {
    console.error('Error fetching student testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch student testimonials' });
  }
});

// Get testimonial by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // Check if success_stories column exists
    const testimonialsQuery = await req.app.locals.db.query("SHOW COLUMNS FROM student_testimonials LIKE 'success_stories'");
    const includeSuccessStories = testimonialsQuery[0].length > 0;
    
    let query = 'SELECT id, student_name, testimonial, service_id';
    if (includeSuccessStories) {
      query += ', success_stories';
    }
    query += ' FROM student_testimonials WHERE id = ?';
    
    const [rows] = await req.app.locals.db.query(query, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
});

// Create a new testimonial
router.post('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { student_name, testimonial, service_id } = req.body;
    
    // Validate required fields
    if (!student_name || !testimonial) {
      return res.status(400).json({ 
        error: 'Missing required fields: student_name and testimonial are required' 
      });
    }
    
    // Insert new testimonial
    const [result] = await req.app.locals.db.query(
      'INSERT INTO student_testimonials (student_name, testimonial, service_id) VALUES (?, ?, ?)',
      [student_name, testimonial, service_id || null]
    );
    
    // Get the newly created testimonial
    const [newTestimonial] = await req.app.locals.db.query(
      'SELECT * FROM student_testimonials WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newTestimonial[0]);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// Update a testimonial
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { student_name, testimonial, service_id } = req.body;
    
    // Check if the testimonial exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM student_testimonials WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    // Update the testimonial
    await req.app.locals.db.query(
      'UPDATE student_testimonials SET student_name = ?, testimonial = ?, service_id = ? WHERE id = ?',
      [student_name, testimonial, service_id, id]
    );
    
    // Get the updated testimonial
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM student_testimonials WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// Delete a testimonial
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the testimonial exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM student_testimonials WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    // Delete the testimonial
    await req.app.locals.db.query(
      'DELETE FROM student_testimonials WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

export default router;