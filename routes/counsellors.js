// counsellors.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { upload, processImage } from '../middleware/multer.js';

const router = express.Router();

// Get all counsellors members
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM counsellors');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching counsellor:', error);
    res.status(500).json({ error: 'Failed to fetch counsellors' });
  }
});

// Get a single counsellor by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM counsellors WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'counsellor not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching counsellor:', error);
    res.status(500).json({ error: 'Failed to fetch counsellor' });
  }
});

// Get a single counsellor profile in their dashboard by ID
router.get('/dashboard/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM counsellors WHERE user_id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'counsellor not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching counsellor:', error);
    res.status(500).json({ error: 'Failed to fetch counsellor' });
  }
});

// Create a new counsellor
router.post('/', upload.single('avatar'), processImage, async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { name, bio, education, languages, work_experience, certifications, achievements, email, password } = req.body;
    
    // Validate required fields
    if (!name || !bio || !education || !languages || !work_experience || !certifications || !achievements || !email ) {
      return res.status(400).json({ 
        error: 'Missing required fields.' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new counsellor
    const [result] = await req.app.locals.db.query(
      'INSERT INTO counsellors (name, bio, education, languages, work_experience, certifications, achievements, email, password ) VALUES (?, ?, ?, ?, ?, ?. ?, ?, ?)',
      [name, bio, education, languages, work_experience, certifications, achievements, email, hashedPassword]
    );
    
    // Get the newly created counsellor
    const [newCounsellor] = await req.app.locals.db.query(
      'SELECT * FROM counsellors WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newCounsellor[0]);
  } catch (error) {
    console.error('Error creating counsellor:', error);
    res.status(500).json({ error: 'Failed to create counsellor' });
  }
});

// Update a counsellor from admin dashboard
router.put('/:id', upload.single('avatar'), processImage, async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { name, bio, education, languages, work_experience, certifications, achievements, email, password } = req.body;
    let avatar = null;
    if (req.file){
      avatar = req.file.processed.filename
    }

    // Check if the counsellor exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM counsellors WHERE user_id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'counsellor not found' });
    }
    
    // Update the counsellor
    const query = 'UPDATE counsellors SET name = ?, bio = ?, education = ?, languages = ?, work_experience = ?, certifications = ?, achievements = ?, email = ?, avatar_url=? WHERE user_id = ? ';
    const values = [ name || existing[0].name, 
                    bio || existing[0].bio, 
                    education || existing[0].education,
                    languages || existing[0].languages, 
                    work_experience || existing[0].work_experiences, 
                    certifications || existing[0].certifications, 
                    achievements || existing[0].achievements, 
                    email || existing[0].email,
                    avatar || existing[0].avatar_url,
                   id];
    
    await req.app.locals.db.query(query, values);

    if(password){
      const hashedPassword = await bcrypt.hash(password, 10);
      const passwordQuery = 'UPDATE users SET password = ? WHERE user_id = ?';
      const passwordValues = [hashedPassword, id];
      
      await req.app.locals.db.query(passwordQuery, passwordValues);
    }
        
    // Get the updated counsellor
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM counsellors WHERE user_id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating counsellor:', error);
    res.status(500).json({ error: 'Failed to update counsellor' });
  }
});

// Update a counsellor from their own dashboard
router.put('/dashboard/:id', upload.single('avatar'), processImage, async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { name, bio, education, languages, work_experience, certifications, achievements, email, password } = req.body;
    let avatar = null;
    if (req.file){
      avatar = req.file.processed.filename
    }

    // Check if the counsellor exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM counsellors WHERE user_id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'counsellor not found' });
    }
    
    // Update the counsellor
    const query = 'UPDATE counsellors SET name = ? bio = ? education = ? languages = ? work_experience = ? certifications = ? achievements = ? email = ? WHERE id = ?';
    const values = [ name || existing[0].name, 
                    bio || existing[0].bio, 
                    education || existing[0].education,
                    languages || existing[0].languages, 
                    work_experience || existing[0].work_experiences, 
                    certifications || existing[0].certifications, 
                    achievements || existing[0].achievements, 
                    email || existing[0].email, 
                    avatar || existing[0].avatar_url,
                   id];
    
    await req.app.locals.db.query(query, values);
    
    if(password){
      const hashedPassword = await bcrypt.hash(password, 10);
      const passwordQuery = 'UPDATE users SET password = ? WHERE id = ?';
      const passwordValues = [hashedPassword, id];
      
      await req.app.locals.db.query(passwordQuery, passwordValues);
    }

    // Get the updated counsellor
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM counsellors WHERE user_id = ?',
      [id]
    );

    res.json({ message: 'Information updated successfully'});
  } catch (error) {
    console.error('Error updating counsellor:', error);
    res.status(500).json({ error: 'Failed to update counsellor' });
  }
});


// Delete a counsellor
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the counsellor exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM counsellors WHERE user_id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'counsellor not found' });
    }
    
    // Delete the counsellor
    await req.app.locals.db.query(
      'DELETE FROM counsellors WHERE user_id = ?',
      [id]
    );
    
    res.json({ message: 'counsellor deleted successfully' });
  } catch (error) {
    console.error('Error deleting counsellor:', error);
    res.status(500).json({ error: 'Failed to delete counsellor' });
  }
});

export default router;