-- Only add the column if it doesn't exist
-- Check may vary depending on SQL dialect (shown here for MySQL)
-- For other platforms like PostgreSQL or SQLite, different metadata queries apply
-- This version assumes MySQL or MariaDB
DROP PROCEDURE IF EXISTS AddSuccessStoriesColumnIfExists;
DELIMITER //
CREATE PROCEDURE AddSuccessStoriesColumnIfExists()
BEGIN
    IF NOT EXISTS (
        SELECT * FROM information_schema.COLUMNS
        WHERE COLUMN_NAME = 'success_stories'
          AND TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = 'student_testimonials'
    ) THEN
        ALTER TABLE student_testimonials 
        ADD COLUMN success_stories TEXT NULL DEFAULT NULL AFTER testimonial;
    END IF;
END //
DELIMITER ;

-- Execute the procedure
CALL AddSuccessStoriesColumnIfExists();

-- Update existing testimonials with appropriate success stories based on service type
-- Wrap in transaction for atomic update (supported in most SQL databases)
START TRANSACTION;

UPDATE student_testimonials st
JOIN educational_services es ON st.service_id = es.id
SET st.success_stories = 
  CASE es.service_key
    WHEN 'study-coaching' THEN 
      'Emma''s Journey: When Emma came to us, she was a bright high school junior struggling with organizational challenges that were affecting her grades. Through our study coaching program, Emma developed a digital organization system that worked with her ADHD, learned study techniques that matched her visual learning style, and established routines that helped her manage her time more effectively. Within one semester, Emma''s grades improved from mostly Bs and Cs to As and Bs. More importantly, she reported feeling less stressed and more confident about her academic abilities. Emma is now thriving in college using the skills she developed through study coaching.'
    WHEN 'subject-tutoring' THEN 
      'Jason L.: My calculus grade went from a C- to an A- after just two months of tutoring. My tutor made complex concepts clear and built my confidence.\n\nMia R.: The group setting has helped my daughter build confidence in speaking up and sharing her ideas. The teacher does a great job managing the class.\n\nMichael T.: I love how our Spanish class combines structured learning with fun group activities. It''s made learning a new language much more enjoyable!'
    WHEN 'standardized-test-prep' THEN
      'Sarah M. (SAT): The structured program and focused practice made all the difference. I was able to earn a scholarship to my dream school!\n\nDavid L. (ACT): My tutor helped me identify my weaknesses and create a targeted study plan. The science section strategies were especially helpful.\n\nMaya R. (AP Calculus): I was struggling with calculus concepts, but my AP prep tutor broke everything down in a way that finally made sense to me.'
    WHEN 'learn-languages' THEN
      'Student 1: Learning Spanish through this program has been transformative. The combination of structured lessons and cultural immersion has made it both effective and enjoyable.\n\nStudent 2: I appreciate the flexibility of the program which allowed me to balance language learning with my other commitments while still making steady progress.'
    WHEN 'subject-classes' THEN
      'Sarah M.: The group math class helped me understand concepts better through peer discussions and collaborative problem-solving.\n\nThomas W.: The group setting has helped my daughter build confidence in speaking up and sharing her ideas. The teacher does a great job managing the class.'
    ELSE
      'This student testimonial represents a general success story for our educational services. Each student receives personalized attention and support tailored to their specific needs and goals.'
  END
WHERE st.success_stories IS NULL;

COMMIT;