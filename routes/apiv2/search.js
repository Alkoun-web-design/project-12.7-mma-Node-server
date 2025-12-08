// Create new file with basic search route
import express from 'express';
const router = express.Router();

// Search endpoint
router.get('/', async (req, res) => {
  try {
    const { q, filters } = req.query;
    
    // Validate input
    if (!q || q.length < 2) {
      return res.status(400).json({ 
        error: 'Search query must be at least 2 characters long' 
      });
    }

    // Parse filters from stringified JSON array
    let categories = [];
    try {
      if (filters) {
        categories = JSON.parse(filters);
        // If 'all' is selected or no filters, search all categories
        if (categories.includes('all') || categories.length === 0) {
          categories = ['tutors', 'counsellors', 'admins', 'academic-resources', 'classroom-schedules', 
          'coaching-areas', 'educational-services', 'pricing', 'services-pricing', 'student-activities', 
          'testimonials', 'subjects', 'standardized-test-prep', 'languages'];
        }
      }
    } catch (err) {
      console.error('Error parsing filters:', err);
      categories = ['tutors', 'counsellors', 'admins', 'academic-resources', 'classroom-schedules', 
        'coaching-areas', 'educational-services', 'pricing', 'services-pricing', 'student-activities', 
        'testimonials', 'subjects', 'standardized-test-prep', 'languages'];
    }

    // Get MySQL connection
    const db = req.app.locals.db; // Access the MySQL pool from app locals
    
    // Build SQL query - simplified for MySQL
    // let query = `SELECT * FROM (
    //   SELECT name, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, email, 'tutors' AS category
    //   FROM tutors UNION ALL
    //   SELECT name, bio, education, languages, work_experience, certifications, achievements, email, 'counsellors' AS category
    //   FROM counsellors UNION ALL
    //   SELECT name, bio, education, languages, work_experience, certifications, achievements, email, 'admins' AS category
    //   FROM admins UNION ALL
    //   SELECT category_title, description, features, 'academic-resources' AS category
    //   FROM academic_resources UNION ALL
    //   SELECT classroom_schedules timing, description, status, timeframe, 'classroom-schedules' AS category
    //   FROM classroom_schedules UNION ALL
    //   SELECT title, description, benefits, 'coaching-areas' AS category 
    //   FROM coaching_areas UNION ALL
    //   SELECT name, short_description, 'educational_services' AS category
    //   FROM educational_services UNION ALL
    //   SELECT question, answer, category,  'faqs' AS category
    //   FROM faqs UNION ALL
    //   SELECT name, 'languages' AS category
    //   FROM languages UNION ALL
    //   SELECT name, description, price, annual_price, annual_description, features, 'pricing' AS category
    //   FROM pricing UNION ALL
    //   SELECT service, description, individual, package, 'services-pricing' AS category
    //   FROM services_pricing UNION ALL
    //   SELECT test, description, format, duration, features, 'standardized-test-prep' AS category 
    //   FROM standardized_test_prep UNION ALL
    //   SELECT name, age_group, description, schedule, 'student-activities' AS category
    //   FROM student_activities UNION ALL
    //   SELECT student_name, testimonial, success_stories, 'testimonials' AS category
    //   FROM testimonials UNION ALL
    //   SELECT name, level, 'subjects' AS category
    //   FROM subjects UNION ALL
    // ) AS search_results
    // WHERE title LIKE ? OR description LIKE ?
    // ORDER BY category`;

    // let query = `
    // SELECT name, bio, education, subject_speciality, teaching_style, languages, work_experience, certifications, achievements, email, 'tutors' AS category
    // FROM tutors
    // WHERE name LIKE ? OR bio LIKE ? OR education LIKE ? OR subject_speciality LIKE ? OR teaching_style LIKE ? OR languages LIKE ? OR work_experience LIKE ? OR certifications LIKE ? OR achievements LIKE ? OR email LIKE ?`;
    
    // // Add search term
    // const searchTerm = `%${q}%`;
    // const params = Array(10).fill(searchTerm); // One for each ?
    // // Execute query
    // const [results] = await db.query(query, [params]);
    
let query = `
  SELECT name, bio, education, subject_speciality, teaching_style, languages, 
         work_experience, certifications, achievements, email, 'tutors' AS category
  FROM tutors
  WHERE name LIKE ? OR bio LIKE ? OR education LIKE ? OR subject_speciality LIKE ? 
     OR teaching_style LIKE ? OR languages LIKE ? OR work_experience LIKE ? 
     OR certifications LIKE ? OR achievements LIKE ? OR email LIKE ?`;

  // Create array with searchTerm repeated for each placeholder
  const searchTerm = `%${q}%`;
  const params = Array(10).fill(searchTerm); // One for each ?
    
  // Execute query
  const [results] = await db.query(query, params);

    // Return results
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An error occurred while performing the search' });
  }
});

export default router;