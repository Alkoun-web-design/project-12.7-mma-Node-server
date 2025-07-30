-- Rename users table to admin and remove role column
RENAME TABLE users TO admin;
ALTER TABLE admin DROP COLUMN role;

-- Add role and password columns to staff
ALTER TABLE staff ADD COLUMN role ENUM('tutor','counselor') NOT NULL DEFAULT 'tutor';
ALTER TABLE staff ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '';

-- Set all existing staff roles to 'tutor'
UPDATE staff SET role = 'tutor';
