-- 2025-05-26_create_service_pricing.sql
CREATE TABLE service_pricing (
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

-- Indexes
CREATE INDEX idx_service_pricing_order ON service_pricing(order_index);
CREATE INDEX idx_service_pricing_active ON service_pricing(is_active);