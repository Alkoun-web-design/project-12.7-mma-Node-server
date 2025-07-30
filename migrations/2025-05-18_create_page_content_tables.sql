-- Table for Home page content
CREATE TABLE IF NOT EXISTS home_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hero_title VARCHAR(255),
  hero_subtitle VARCHAR(255),
  about_title VARCHAR(255),
  about_content TEXT,
  features_title VARCHAR(255),
  features_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for Educational Services page content
CREATE TABLE IF NOT EXISTS educational_services_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  intro_title VARCHAR(255),
  intro_content TEXT,
  service1_title VARCHAR(255),
  service1_content TEXT,
  service2_title VARCHAR(255),
  service2_content TEXT,
  service3_title VARCHAR(255),
  service3_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for FAQs page content
CREATE TABLE IF NOT EXISTS faqs_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255),
  answer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for Pricing page content
CREATE TABLE IF NOT EXISTS pricing_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plan_name VARCHAR(255),
  plan_description TEXT,
  price VARCHAR(50),
  features TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for About/Staff page content
CREATE TABLE IF NOT EXISTS staff_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_title VARCHAR(255),
  section_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for Contact page content
CREATE TABLE IF NOT EXISTS contact_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_title VARCHAR(255),
  contact_description TEXT,
  address VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
