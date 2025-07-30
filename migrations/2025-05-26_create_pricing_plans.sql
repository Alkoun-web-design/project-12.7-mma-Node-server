-- 2025-05-26_create_pricing_plans.sql
CREATE TABLE pricing_plans (
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

-- Indexes
CREATE INDEX idx_pricing_plans_order ON pricing_plans(order_index);
CREATE INDEX idx_pricing_plans_active ON pricing_plans(is_active);

-- Insert sample pricing plans
INSERT INTO pricing_plans (name, description, price, annual_price, annual_description, features, popular, link_to, order_index) VALUES
('Basic', 'For students needing occasional help', '$199/month', '$1999/year', 'For students needing occasional help billed annually', '["4 hours of tutoring per month", "Basic study resources", "Email support", "1 subject focus"]', false, '/get-in-touch', 1),
('Standard', 'Our most popular plan for regular students', '$499/month', '$4999/year', 'Our most popular plan for regular students billed annually', '["12 hours of tutoring per month", "Full resource library access", "Progress tracking and reports", "Priority scheduling", "Up to 3 subject areas"]', true, '/get-in-touch', 2),
('Premium', 'Comprehensive support for dedicated students', '$899/month', '$8999/year', 'Comprehensive support for dedicated students billed annually', '["25 hours of tutoring per month", "Full curriculum access", "Weekly progress meetings", "24/7 support access", "Unlimited subjects", "Test prep materials included"]', false, '/get-in-touch', 3);