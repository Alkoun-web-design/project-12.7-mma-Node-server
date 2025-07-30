-- Create educational_services table
CREATE TABLE IF NOT EXISTS educational_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_key VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(128) NOT NULL,
    short_description VARCHAR(255),
    details TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert educational services based on dropdown routes
INSERT INTO educational_services (service_key, name, short_description) VALUES
  ('academic-resources', 'Academic Resources', 'Access to curated academic materials and resources.'),
  ('homeschooling', 'Homeschooling', 'Support and resources for home-based education.'),
  ('learn-languages', 'Learn Languages', 'Language learning programs and support.'),
  ('standardized-test-prep', 'Standardized Test Prep', 'Preparation for standardized tests (SAT, ACT, etc).'),
  ('student-clubs', 'Student Clubs', 'Join or create student-led clubs and activities.'),
  ('study-coaching', 'Study Coaching', 'Personalized study coaching and strategies.'),
  ('subject-classes', 'Combined Classes', 'Group classes for various subjects.'),
  ('subject-tutoring', '1 on 1', 'Individualized tutoring and support.');

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    code VARCHAR(8) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert some common languages
INSERT INTO languages (name, code) VALUES
  ('English', 'en'),
  ('Spanish', 'es'),
  ('French', 'fr'),
  ('German', 'de'),
  ('Mandarin', 'zh'),
  ('Arabic', 'ar'),
  ('Russian', 'ru'),
  ('Hindi', 'hi');

-- Create student_testimonials table
CREATE TABLE IF NOT EXISTS student_testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(128) NOT NULL,
    testimonial TEXT NOT NULL,
    service_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES educational_services(id) ON DELETE SET NULL
);

-- Insert example testimonials
INSERT INTO student_testimonials (student_name, testimonial, service_id) VALUES
  ('Alice Johnson', 'The study coaching really helped me improve my grades!', 6),
  ('Carlos Martinez', 'I loved the Learn Languages program. Now I speak French!', 3),
  ('Priya Singh', 'Homeschooling support made learning at home so much easier.', 2);
