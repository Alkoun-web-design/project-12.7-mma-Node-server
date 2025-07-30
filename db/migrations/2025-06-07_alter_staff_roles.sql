// Alter staff table to include admin role
ALTER TABLE staff
MODIFY role ENUM('tutor', 'counselor', 'admin') NOT NULL DEFAULT 'tutor';

// Create admin_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_profiles (
  id INT PRIMARY KEY,
  staff_id INT UNIQUE,
  permissions JSON,
  last_login TIMESTAMP,
  login_count INT DEFAULT 0,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  preferred_language VARCHAR(50) DEFAULT 'en',
  theme_preference VARCHAR(20) DEFAULT 'system',
  notification_settings JSON,
  profile_image_url VARCHAR(255),
  role_tags JSON,
  FOREIGN KEY (staff_id) REFERENCES staff(user_id)
);