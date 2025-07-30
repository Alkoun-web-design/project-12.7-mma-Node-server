// users.js
import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get all users members
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await req.app.locals.db.query('SELECT id, email, user_type FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { id } = req.params;
    
    const [rows] = await req.app.locals.db.query('SELECT id, email, user_type FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { email, user_type, password } = req.body;
    
    // Validate required fields
    if (!user_type || !email || !password) {
      return res.status(400).json({ 
        error: 'Missing required fields.' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    const [result] = await req.app.locals.db.query(
      'INSERT INTO users ( email, user_type, password) VALUES (?, ?, ?)',
      [ email, user_type, hashedPassword]
    );
    
    // Get the newly created user
    // const [newUser] = await req.app.locals.db.query(
    //   'SELECT * FROM users WHERE id = ?',
    //   [result.insertId]
    // );

    // Get the newly created user
    const [newUser] = await req.app.locals.db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

        //creat user in the user_type table
    const [secondResult] = await req.app.locals.db.query(
      `INSERT INTO ${user_type}s (email, user_id) VALUES (?, ?)`,
      [email, newUser[0].id]
    );
    
    res.status(201).json(newUser[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    const { email, user_type, password } = req.body;
    
    // Check if the user exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update the user
    const query = 'UPDATE users SET email = ?, role = ?, password = ? WHERE id = ?';
    const values = [email || existing[0].email,
                   user_type || existing[0].user_type,
                   hashedPassword || existing[0].password,
                   id];
    
    await req.app.locals.db.query(query, values);
    
    // Get the updated user
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { id } = req.params;
    
    // Check if the user exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    }
    
    // Delete the user
    await req.app.locals.db.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'user deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;