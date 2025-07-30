CREATE TABLE IF NOT EXISTS standardized_test_prep (
  id INT PRIMARY KEY AUTO_INCREMENT,
  test VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  format VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  features JSON NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO standardized_test_prep (test, description, format, duration, features) VALUES
(
  'SAT',
  'Comprehensive preparation for the SAT exam covering Critical Reading, Writing, and Mathematics.',
  'Group classes or private tutoring',
  '8-12 weeks depending on starting level',
  '["Diagnostic assessment", "Custom study plan", "Content review", "Test-taking strategies", "Full-length practice tests", "Score improvement tracking"]'
),
(
  'ACT',
  'Targeted preparation for all sections of the ACT exam: English, Math, Reading, Science, and optional Writing.',
  'Group classes or private tutoring',
  '8-12 weeks depending on starting level',
  '["Diagnostic assessment", "Custom study plan", "Section-specific strategies", "Science reasoning techniques", "Full-length practice tests", "Score improvement tracking"]'
),
(
  'AP Exams',
  'Subject-specific preparation for Advanced Placement exams in all major subjects.',
  'Private tutoring or small group by subject',
  '10-16 weeks (semester-based)',
  '["Content mastery", "Essay and free response practice", "Multiple choice strategies", "Practice exams", "Subject-specific study techniques", "Review of key concepts"]'
),
(
  'State Standardized Tests',
  'Preparation for state-specific standardized assessments at all grade levels.',
  'Private tutoring or small group',
  '4-8 weeks depending on needs',
  '["Familiarity with test format", "Content review aligned with state standards", "Practice with sample questions", "Test-taking strategies", "Stress reduction techniques", "Regular progress assessment"]'
); 