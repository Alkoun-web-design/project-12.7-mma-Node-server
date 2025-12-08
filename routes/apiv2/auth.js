import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();

//signup route
router.post('/sign-up', async (req, res) => {
  const { email, password } = req.body;

  try{
    if(!email || !password) {
      return res.status(422).json('error: email and password are required to sign up.')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json('You have signed up successfully!');
    console.log(`New user => id:${newUser._id}, email:${newUser.email}`)
  } catch (error){
    return res.status(500).json('error: Something went wrong.');
  }
});

//login route
router.post('/sign-in', express.urlencoded(), async (req, res) => {
  
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json('Both email and password are required to login.');
    }

    const [rows] = await req.app.locals.db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = rows[0];
    console.log(user);

    const verifyPasword = await bcrypt.compare(password, user.password)

    if (!verifyPasword) {
      console.log('Invalid password for:', email);
      return res.status(400).json('Incorrect email or password.');
    }
    
    // authentication successful
    req.session.user = { id: user.id, email: user.email, user_type: user.user_type };
    res.status(200).json({id: user.id, userType: user.user_type});
    
  } catch (error) {
    res.status(500).json({ error: 'Error: Something went wrong.' });
  }
})

//signout route
router.post('/sign-out', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json('Unauthorized: You must be signed in to sign out.');
    }
    req.session.destroy();
    res.clearCookie(req.sessionID).json('Signed out successfully.');
  } catch (error) {
    console.error('Error signing out:', error);
    return res.status(500).json('Error: Something went wrong.');
  }
});

export default router;