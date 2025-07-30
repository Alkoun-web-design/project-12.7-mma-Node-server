-- 2025-05-26_create_pricing_tables.sql
-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(50) NOT NULL,
  annual_price VARCHAR(50),
  annual_description TEXT,
  features JSON NOT NULL,
  popular BOOLEAN DEFAULT false,
  link_to VARCHAR(255),
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes for pricing_plans
CREATE INDEX idx_pricing_plans_order ON pricing_plans(order_index);
CREATE INDEX idx_pricing_plans_active ON pricing_plans(is_active);

-- Insert sample pricing plans
INSERT INTO pricing_plans (name, description, price, annual_price, annual_description, features, popular, link_to, order_index) VALUES
('Basic', 'For students needing occasional help', '$199/month', '$1999/year', 'For students needing occasional help billed annually', '["4 hours of tutoring per month", "Basic study resources", "Email support", "1 subject focus"]', false, '/get-in-touch', 1),
('Standard', 'Our most popular plan for regular students', '$499/month', '$4999/year', 'Our most popular plan for regular students billed annually', '["12 hours of tutoring per month", "Full resource library access", "Progress tracking and reports", "Priority scheduling", "Up to 3 subject areas"]', true, '/get-in-touch', 2),
('Premium', 'Comprehensive support for dedicated students', '$899/month', '$8999/year', 'Comprehensive support for dedicated students billed annually', '["25 hours of tutoring per month", "Full curriculum access", "Weekly progress meetings", "24/7 support access", "Unlimited subjects", "Test prep materials included"]', false, '/get-in-touch', 3);

-- Create service_pricing table
CREATE TABLE IF NOT EXISTS service_pricing (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  individual VARCHAR(100) NOT NULL,
  package VARCHAR(100) NOT NULL,
  link_to VARCHAR(255),
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes for service_pricing
CREATE INDEX idx_service_pricing_order ON service_pricing(order_index);
CREATE INDEX idx_service_pricing_active ON service_pricing(is_active);

-- Insert sample service pricing
INSERT INTO service_pricing (service, description, individual, package, link_to, order_index) VALUES
('Home-schooling', 'Complete curriculum and instruction', '$1200-1800/month', '$10,800/year (10% savings)', '/educational-services/homeschooling', 1),
('Subject Tutoring', 'One-on-one specialized instruction', '$60-90/hour', '$499/month (12 hrs)', '/educational-services/subject-tutoring', 2),
('Subject Classes', 'Small group instruction (5-8 students)', '$35-45/hour', '$299/month (8 classes)', '/educational-services/subject-classes', 3),
('Standardized Test Prep', 'Comprehensive preparation programs', '$75-95/hour', '$1200-1800 (full program)', '/educational-services/standardized-test-prep', 4),
('Study Coaching', 'Skills development and academic counseling', '$70-90/hour', '$599/month (8 sessions)', '/educational-services/study-coaching', 5),
('Student Clubs', 'Extracurricular learning activities', '$25-40/session', '$199/month (weekly meetings)', '/educational-services/student-clubs', 6),
('Academic Resources', 'Digital and physical learning materials', 'Varies by resource', '$99/month (full access)', '/educational-services/academic-resources', 7),
('Language Learning', 'Comprehensive language instruction', '$55-75/hour', '$399/month (8 sessions)', '/educational-services/learn-languages', 8);