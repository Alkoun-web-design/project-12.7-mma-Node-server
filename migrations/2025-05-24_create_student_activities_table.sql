-- Create student_activities table
CREATE TABLE IF NOT EXISTS student_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age_groups JSON NOT NULL,
  description TEXT NOT NULL,
  schedule VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO student_activities (name, age_groups, description, schedule, image_url, is_active) VALUES
(
  'Debate & Public Speaking',
  JSON_ARRAY('Middle School', 'High School'),
  'Develop critical thinking and communication skills through structured debates and public speaking exercises. Students learn to construct arguments, present ideas clearly, and engage in respectful discourse.',
  'Every Tuesday, 3:30 PM - 5:00 PM',
  '/images/activities/debate.jpg',
  true
),
(
  'Robotics & Engineering',
  JSON_ARRAY('Elementary (8-10)', 'Middle School'),
  'Explore the exciting world of robotics and engineering through hands-on projects. Students learn programming, mechanical design, and problem-solving while building and programming robots.',
  'Every Wednesday, 3:30 PM - 5:00 PM',
  '/images/activities/robotics.jpg',
  true
),
(
  'Art & Creative Expression',
  JSON_ARRAY('Elementary (6-10)', 'Middle School'),
  'Unleash creativity through various art forms including painting, drawing, sculpture, and digital art. Students develop artistic skills while expressing themselves through different mediums.',
  'Every Thursday, 3:30 PM - 5:00 PM',
  '/images/activities/art.jpg',
  true
),
(
  'Science Explorers',
  JSON_ARRAY('Elementary (7-10)', 'Middle School'),
  'Engage in hands-on science experiments and investigations. Students explore various scientific concepts through interactive activities and real-world applications.',
  'Every Friday, 3:30 PM - 5:00 PM',
  '/images/activities/science.jpg',
  true
),
(
  'Math Olympiad',
  JSON_ARRAY('Elementary (9-10)', 'Middle School', 'High School'),
  'Challenge yourself with advanced mathematical concepts and problem-solving strategies. Students prepare for math competitions while developing critical thinking skills.',
  'Every Monday, 3:30 PM - 5:00 PM',
  '/images/activities/math.jpg',
  true
),
(
  'Coding Club',
  JSON_ARRAY('Elementary (8-10)', 'Middle School', 'High School'),
  'Learn programming fundamentals and create your own games, apps, and websites. Students develop computational thinking and problem-solving skills through coding projects.',
  'Every Saturday, 10:00 AM - 12:00 PM',
  '/images/activities/coding.jpg',
  true
),
(
  'Environmental Science',
  JSON_ARRAY('Elementary (7-10)', 'Middle School'),
  'Explore environmental concepts and sustainability through hands-on activities. Students learn about ecosystems, conservation, and environmental stewardship.',
  'Every Wednesday, 3:30 PM - 5:00 PM',
  '/images/activities/environment.jpg',
  true
),
(
  'Language Arts & Creative Writing',
  JSON_ARRAY('Elementary (6-10)', 'Middle School'),
  'Develop writing skills and explore different literary genres. Students engage in creative writing, poetry, and storytelling while improving their language arts abilities.',
  'Every Tuesday, 3:30 PM - 5:00 PM',
  '/images/activities/writing.jpg',
  true
),
(
  'Music & Performance',
  JSON_ARRAY('Elementary (6-10)', 'Middle School', 'High School'),
  'Discover the joy of music through singing, playing instruments, and performance. Students develop musical skills and confidence through group activities and performances.',
  'Every Thursday, 3:30 PM - 5:00 PM',
  '/images/activities/music.jpg',
  true
),
(
  'Sports & Physical Education',
  JSON_ARRAY('Elementary (6-10)', 'Middle School', 'High School'),
  'Stay active and develop teamwork skills through various sports and physical activities. Students learn sportsmanship, coordination, and healthy living habits.',
  'Every Monday, 3:30 PM - 5:00 PM',
  '/images/activities/sports.jpg',
  true
); 