-- Insert placeholder data for subjects, staff, and schedules

-- SUBJECTS
INSERT INTO subjects (name, level) VALUES
  ('Mathematics', 'All Levels'),
  ('Science', 'All Levels'),
  ('English', 'All Levels'),
  ('Spanish', 'All Levels'),
  ('Test Prep', 'High School');

-- STAFF (insert random names for each row, not tied to users table)
INSERT INTO staff (user_id, name, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, avatar_url) VALUES
  (2, 'Emily Roberts', 'Specializes in making complex math concepts accessible.', 'M.S. Mathematics', 'Mathematics', 'Conceptual and practical', 'English', '10 years teaching math', 'Math Teaching Certificate', 'Math Olympiad Coach', NULL),
  (2, 'Sarah Chen', 'Expert in hands-on science education and lab safety.', 'Ph.D. Chemistry', 'Science', 'Experimental, inquiry-based', 'English, Mandarin', '8 years teaching science', 'PhD in Chemistry', 'Science Fair Judge', NULL),
  (2, 'Michael Okafor', 'Passionate about creative writing and literature.', 'MFA Creative Writing', 'English', 'Workshop-based', 'English', '8 years teaching English', 'Creative Writing MFA', 'Published Author', NULL),
  (2, 'Ana Martinez', 'Immersive language instructor with a love for culture.', 'M.A. Linguistics', 'Spanish', 'Immersive, communicative', 'Spanish, French, English', '6 years language teaching', 'Linguistics MA', 'Polyglot Award', NULL),
  (2, 'David Kim', 'Test prep specialist focused on student success.', 'B.A. Education', 'Test Prep', 'Strategy-focused', 'English', '7 years test prep', 'Certified Test Prep Specialist', 'Helped 100+ students', NULL);

-- STAFF_SUBJECTS (already populated, skip to avoid duplicates)

-- SCHEDULES (teacher_id must be user_id 2)
INSERT INTO schedules (subject_id, teacher_id, timing, timeframe) VALUES
  (17, 2, 'Mon 10:00-11:00', 'Week'),
  (18, 2, 'Tue 11:00-12:00', 'Week'),
  (19, 2, 'Wed 09:00-10:00', 'Week');
