-- First, remove the primary key constraint
ALTER TABLE staff DROP PRIMARY KEY;

-- Then modify user_id to be auto-incrementing and set it as primary key
ALTER TABLE staff MODIFY user_id INT AUTO_INCREMENT PRIMARY KEY; 