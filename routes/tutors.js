// tutors.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { upload, processImage} from '../middleware/multer.js';

const router = express.Router();

// Get all tutors members
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM tutors');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tutors members:', error);
    res.status(500).json({ error: 'Failed to fetch tutorss' });
  }
});

// Get a single tutor by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM tutors WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'tutor not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching tutor:', error);
    res.status(500).json({ error: 'Failed to fetch tutor' });
  }
});

// Get a signed-in tutor's profile by ID
router.get('/dashboard/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT * FROM tutors WHERE user_id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'tutor not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching tutor:', error);
    res.status(500).json({ error: 'Failed to fetch tutor' });
  }
});

// Create a new tutor
router.post('/', upload.single('avatar'), processImage, async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { name, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, email, password } = req.body;
    
    // Validate required fields
    if (!name || !bio || !education || !subject_speciality || !teaching_style || !languages || !work_experience || !certifications || !achievements || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields.' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new tutor
    const [result] = await req.app.locals.db.query(
      'INSERT INTO tutors (name, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, email) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, email]
    );
    
    // Get the newly created tutor
    const [newTutor] = await req.app.locals.db.query(
      'SELECT * FROM tutors WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newTutor[0]);
  } catch (error) {
    console.error('Error creating tutor:', error);
    res.status(500).json({ error: 'Failed to create tutor' });
  }
});

// Update a tutor profile from their own dashboard
router.put('/dashboard/:id', upload.single('avatar'), processImage, async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { name, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, email, password } = req.body;
    let avatar = null;
    if (req.file){
      avatar = req.file.processed.filename
    }
    
    // Check if the tutor exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM tutors WHERE user_id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'tutor not found' });
    }
    
    // Update the tutor
    const query = 'UPDATE tutors SET name = ?, bio = ?, education = ?, subject_speciality = ?, teaching_style = ?, languages = ?, work_experience = ?, certifications = ?, achievements = ?, email = ?, avatar_url = ? WHERE user_id = ?';
    const values = [name || existing[0].name, 
                    bio || existing[0].bio, 
                    education || existing[0].education, 
                    subject_speciality || existing[0].subject_speciality, 
                    teaching_style || existing[0].teaching_style, 
                    languages || existing[0].languages, 
                    work_experience || existing[0].work_experience, 
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

    // Get the updated tutor
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM tutors WHERE user_id = ?',
      [id]
    );
    
    res.json({ message: 'Information updated successfully'});
  } catch (error) {
    console.error('Error updating tutor:', error);
    res.status(500).json({ error: 'Failed to update tutor' });
  }
});

// Update a tutor profile from admin dashboard
router.put('/:id', upload.single('avatar'), processImage, async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { name, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, email } = req.body;
    let avatar = null;
    if (req.file){
      avatar = req.file.processed.filename
    }

    // Check if the tutor exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM tutors WHERE user_id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'tutor not found' });
    }
    
    // Update the tutor
    const query = 'UPDATE tutors SET name = ?, bio = ?, education = ?, subject_speciality = ?, teaching_style = ?, languages = ?, work_experience = ?, certifications = ?, achievements = ?, email = ?, avatar_url = ? WHERE user_id = ?';
    const values = [name || existing[0].name, 
                    bio || existing[0].bio, 
                    education || existing[0].education, 
                    subject_speciality || existing[0].subject_speciality, 
                    teaching_style || existing[0].teaching_style, 
                    languages || existing[0].languages, 
                    work_experience || existing[0].work_experience, 
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
    
    // Get the updated tutor
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM tutors WHERE user_id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating tutor:', error);
    res.status(500).json({ error: 'Failed to update tutor' });
  }
});

// Delete a tutor
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the tutor exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM tutors WHERE user_id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'tutor not found' });
    }
    
    // Delete the tutor
    await req.app.locals.db.query(
      'DELETE FROM tutors WHERE user_id = ?',
      [id]
    );
    
    res.json({ message: 'tutor deleted successfully' });
  } catch (error) {
    console.error('Error deleting tutor:', error);
    res.status(500).json({ error: 'Failed to delete tutor' });
  }
});

export default router;