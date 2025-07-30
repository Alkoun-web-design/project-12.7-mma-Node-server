-- 2025-05-19_create_coaching_areas.sql
CREATE TABLE coaching_areas (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  benefits TEXT[] NOT NULL,
  logo VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_coaching_areas_title ON coaching_areas(title);