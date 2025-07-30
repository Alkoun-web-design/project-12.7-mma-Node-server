-- Home page table
CREATE TABLE IF NOT EXISTS home_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  about_title VARCHAR(255),
  about_content TEXT,
  features_title VARCHAR(255),
  features_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pricing page table
CREATE TABLE IF NOT EXISTS pricing_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  basic_plan_name VARCHAR(255),
  basic_plan_price VARCHAR(50),
  basic_plan_features TEXT,
  standard_plan_name VARCHAR(255),
  standard_plan_price VARCHAR(50),
  standard_plan_features TEXT,
  premium_plan_name VARCHAR(255),
  premium_plan_price VARCHAR(50),
  premium_plan_features TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Staff page table
CREATE TABLE IF NOT EXISTS staff_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  team_intro TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact page table
CREATE TABLE IF NOT EXISTS contact_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  hours TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Academic Resources page table
CREATE TABLE IF NOT EXISTS academic_resources_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  intro_content TEXT,
  resource1_title VARCHAR(255),
  resource1_content TEXT,
  resource2_title VARCHAR(255),
  resource2_content TEXT,
  resource3_title VARCHAR(255),
  resource3_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Homeschooling page table
CREATE TABLE IF NOT EXISTS homeschooling_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  intro_content TEXT,
  program1_title VARCHAR(255),
  program1_content TEXT,
  program2_title VARCHAR(255),
  program2_content TEXT,
  program3_title VARCHAR(255),
  program3_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Learn Languages page table
CREATE TABLE IF NOT EXISTS learn_languages_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  intro_content TEXT,
  language1_name VARCHAR(255),
  language1_content TEXT,
  language2_name VARCHAR(255),
  language2_content TEXT,
  language3_name VARCHAR(255),
  language3_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Standardized Test Prep page table
CREATE TABLE IF NOT EXISTS standardized_test_prep_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  intro_content TEXT,
  test1_name VARCHAR(255),
  test1_content TEXT,
  test2_name VARCHAR(255),
  test2_content TEXT,
  test3_name VARCHAR(255),
  test3_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Student Clubs page table
CREATE TABLE IF NOT EXISTS student_clubs_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  intro_content TEXT,
  club1_name VARCHAR(255),
  club1_content TEXT,
  club2_name VARCHAR(255),
  club2_content TEXT,
  club3_name VARCHAR(255),
  club3_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Combined Classes page table
CREATE TABLE IF NOT EXISTS combined_classes_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  intro_content TEXT,
  class1_name VARCHAR(255),
  class1_content TEXT,
  class2_name VARCHAR(255),
  class2_content TEXT,
  class3_name VARCHAR(255),
  class3_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- One on One page table
CREATE TABLE IF NOT EXISTS one_on_one_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  subtitle TEXT,
  intro_content TEXT,
  benefit1_title VARCHAR(255),
  benefit1_content TEXT,
  benefit2_title VARCHAR(255),
  benefit2_content TEXT,
  benefit3_title VARCHAR(255),
  benefit3_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Student Testimonials table
CREATE TABLE IF NOT EXISTS student_testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_name VARCHAR(255) NOT NULL,
  testimonial TEXT NOT NULL,
  service_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES educational_services(id) ON DELETE SET NULL
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  education TEXT,
  subject_speciality TEXT,
  teaching_style TEXT,
  languages TEXT,
  work_experience TEXT,
  certifications TEXT,
  achievements TEXT,
  avatar_url TEXT,
  role VARCHAR(50) NOT NULL DEFAULT 'staff',
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);