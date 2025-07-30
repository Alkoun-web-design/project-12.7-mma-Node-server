// admin.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { upload, processImage } from '../middleware/multer.js'

const router = express.Router();

// Get all admins
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM admins');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Get a single admin by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM admins WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'admin not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
});

// Create a new admin
router.post('/', upload.single('avatar'), processImage, async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { name, bio, education, languages, work_experience, certifications, achievements, email, password } = req.body;
    
    // Validate required fields
    if (!name || !bio || !education || !languages || !work_experience || !certifications || !achievements || !email || !password ) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }
    
     const hashedPassword = await bcrypt.hash(password, 10);
        
    // Insert new counsellor
    const [result] = await req.app.locals.db.query(
      'INSERT INTO admins (name, bio, education, languages, work_experience, certifications, achievements, email, password ) VALUES (?, ?, ?, ?, ?, ?. ?, ?, ?)',
      [name, bio, education, languages, work_experience, certifications, achievements, email, hashedPassword]
    );
    
    // Get the newly created counsellor
    const [newCounsellor] = await req.app.locals.db.query(
      'SELECT * FROM admins WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newCounsellor[0]);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

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

    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM admins WHERE user_id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'admin not found' });
    }
    
    // Update the counsellor
    const query = 'UPDATE admins SET name = ?, bio = ?, education = ?, languages = ?, work_experience = ?, certifications = ?, achievements = ?, email = ?, avatar_url=? WHERE user_id = ?' ;
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
      'SELECT * FROM admins WHERE user_id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Failed to update admin' });
  }
});

// Delete a admin
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the admin exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM admins WHERE user_id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'admin not found' });
    }
    
    // Delete the admin
    await req.app.locals.db.query(
      'DELETE FROM admins WHERE user_id = ?',
      [id]
    );
    
    res.json({ message: 'admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

// Get all contact form submissions
router.get('/contact', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM contact_submissions');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

export default router;