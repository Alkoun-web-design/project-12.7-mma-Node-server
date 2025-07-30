CREATE TABLE IF NOT EXISTS student_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age_groups JSON NOT NULL,
    description TEXT NOT NULL,
    schedule VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO student_activities (name, age_groups, description, schedule, image_url, is_active) VALUES
('Debate & Public Speaking', '["Elementary (8-10)", "Middle School", "High School"]', 'Develop critical thinking, research skills, and confident public speaking through structured debates and speech activities.', 'Weekly meetings with monthly competitions', 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg', true),
('Robotics & Engineering', '["Elementary (9-10)", "Middle School", "High School"]', 'Design, build, and program robots while solving engineering challenges. Participate in regional and national competitions.', 'Weekly workshops with quarterly competitions', 'https://images.pexels.com/photos/8566469/pexels-photo-8566469.jpeg', true),
('Creative Writing', '["Elementary (7-10)", "Middle School", "High School"]', 'Explore different writing styles and genres, develop storytelling techniques, and create a portfolio of original work.', 'Weekly workshops with quarterly publications', 'https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg', true); 