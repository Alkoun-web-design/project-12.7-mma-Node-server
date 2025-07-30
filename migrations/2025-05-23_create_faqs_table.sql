-- Create faqs table for Q&A
CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES faq_categories(id)
);

-- Create faq_categories table
CREATE TABLE IF NOT EXISTS faq_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  slug VARCHAR(64) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create faqs_page table for page-level content
CREATE TABLE IF NOT EXISTS faqs_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  meta_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create schedules table if it doesn't exist
CREATE TABLE IF NOT EXISTS schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_id INT NOT NULL,
  teacher_id INT NOT NULL,
  timing VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Now Enrolling', 'Starting Next Month', 'Enrollment Closed') DEFAULT 'Now Enrolling',
  timeframe VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (subject_id) REFERENCES subjects(id),
  FOREIGN KEY (teacher_id) REFERENCES staff(user_id)
);

-- Insert sample data into schedules
INSERT INTO schedules (subject_id, teacher_id, timing, description, status, timeframe) VALUES
(1, 1, 'Mondays & Wednesdays, 4:00-5:30 PM', 'Master advanced algebraic concepts, equations, and applications.', 'Now Enrolling', 'Semester'),
(2, 2, 'Tuesdays, 3:30-5:00 PM', 'Develop storytelling skills and explore different writing genres.', 'Now Enrolling', 'Semester'),
(3, 3, 'Thursdays, 4:00-6:00 PM', 'Hands-on chemistry class covering core concepts with lab experiments.', 'Starting Next Month', 'Semester'),
(4, 4, 'Saturdays, 10:00-11:30 AM', 'Introduction to Spanish language and culture with an immersive approach.', 'Now Enrolling', 'Semester'),
(5, 5, 'Fridays, 3:30-5:00 PM', 'Learn programming fundamentals while creating your own games.', 'Now Enrolling', 'Semester'),
(6, 8, 'Mondays, 3:30-5:00 PM', 'Explore the fascinating history of ancient civilizations and their legacies.', 'Starting Next Month', 'Semester');

-- Insert default categories
-- INSERT INTO faq_categories (name, slug) VALUES
-- ('General', 'general'),
-- ('Our Services', 'services'),
-- ('Payments & Pricing', 'payments'),
-- ('Scheduling & Logistics', 'logistics');

-- Insert default page content
INSERT INTO faqs_page (title, subtitle, meta_description) VALUES
('Frequently Asked Questions', 'Find answers to common questions about our services and programs', 'Get answers to frequently asked questions about our educational services, programs, pricing, and more.');

-- Insert sample data into staff
-- INSERT INTO staff (user_id, name, role) VALUES
-- (1, 'Emily Roberts', 'tutor'),
-- (2, 'Sarah Chen', 'tutor'),
-- (3, 'Michael Okafor', 'tutor'),
-- (4, 'Ana Martinez', 'tutor'),
-- (5, 'David Kim', 'tutor'),
-- (8, 'John Smith', 'tutor'),
-- (9, 'Sarah Johnson', 'tutor');
