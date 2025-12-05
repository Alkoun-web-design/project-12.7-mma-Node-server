// pages.js
import express from 'express';

const router = express.Router();

// Get page content by slug
// router.get('/:slug', async (req, res) => {
//   try {
//     if (!req.app.locals.db) {
//       return res.status(500).json({ error: 'Database connection not available' });
//     }
    
//     const [rows] = await req.app.locals.db.query('SELECT * FROM pages WHERE slug = ?', [req.params.slug]);
    
//     if (rows.length === 0) {
//       return res.status(404).json({ error: 'Page not found' });
//     }
//     const columns = Object.keys(rows[0]);
//     res.json(rows[0]);
//   } catch (error) {
//     console.error('Error fetching page:', error);
//     res.status(500).json({ error: 'Failed to fetch page' });
//   }
// });

// Get all pages

router.get('/footer', async (req, res) => {
    try {
      if (!req.app.locals.db) {
        return res.status(500).json({ error: 'Database connection not available' });
      }
      // const [rows] = await req.app.locals.db.query('SELECT * FROM footer');
      const rows = req.app.locals.db.prepare('SELECT * FROM footer');
      res.json(rows.all()); 
    } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).json({ error: 'Failed to fetch footer data' })
    }
});

router.get('/home', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM home_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM home_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM home_page');
    const data = rows.all();
    res.json(data);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/homeschooling', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM homeschooling_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM homeschooling_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM homeschooling_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/one-on-one', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM one_on_one_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM one_on_one_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM one_on_one_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/combined-classes', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM combined_classes_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM combined_classes_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM combined_classes_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/standardized-test-prep', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM standardized_test_prep_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM standardized_test_prep_page');    
    const rows = req.app.locals.db.prepare('SELECT * FROM standardized_test_prep_page');    
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/study-coaching', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM study-coaching_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM study_coaching_page');    
    const rows = req.app.locals.db.prepare('SELECT * FROM study_coaching_page');    
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/student-activities', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM student_clubs_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM student_clubs_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM student_clubs_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/academic-resources', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM academic_resources_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM academic_resources_page');    
    const rows = req.app.locals.db.prepare('SELECT * FROM academic_resources_page');    
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/learn-languages', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM learn_languages_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM learn_languages_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM learn_languages_page');
    const data = rows.all();
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/our-staff', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM our_staff_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM our_staff_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM our_staff_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});router.get('/faqs', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM faqs_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM faqs_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM faqs_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/pricing', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM pricing_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM pricing_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM pricing_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/get-in-touch', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM get_in_touch_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM get_in_touch_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM get_in_touch_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/educational-services', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const [rows] = await req.app.locals.db.query('SELECT * FROM educational_services_page ORDER BY title');
    // const [rows] = await req.app.locals.db.query('SELECT * FROM educational_services_page');
    const rows = req.app.locals.db.prepare('SELECT * FROM educational_services_page');
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// Update all pages
router.put('/footer', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { left_column_title, left_column_subtitle, left_column_logo,
      center_column_title, right_column_title } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM footer WHERE id = 1',
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'footer not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE footer SET 
        left_column_title =?, left_column_subtitle =?, left_column_logo =?,
        center_column_title =?, right_column_title =?` 
      [
        left_column_title || existing[0].left_column_title, 
        left_column_subtitle || existing[0].left_column_subtitle, 
        left_column_logo || existing[0].left_column_logo,
        center_column_title || existing[0].center_column_title, 
        right_column_title || existing[0].right_column_title 
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM footer WHERE id = 1',
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating home_page:', error);
    res.status(500).json({ error: 'Failed to update home_page' });
  }
});

router.put('/home', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle, third_title, 
      third_details, fourth_title, fifth_title, fifth_subtitle,
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM home_page WHERE id = 2',
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'home_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE home_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?, third_title = ?, 
      third_details = ?,
      fourth_title = ?, fifth_title = ?, fifth_subtitle = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle,
        third_title || existing[0].third_title,  
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title,
        fifth_title ||  existing[0].fifth_title, 
        fifth_subtitle || existing[0].fifth_subtitle
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM home_page WHERE id = 2',
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating home_page:', error);
    res.status(500).json({ error: 'Failed to update home_page' });
  }
});

router.put('/homeschooling', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_subtitle, third_details,
      fourth_title, fourth_subtitle, fourth_details,
      fifth_title, fifth_subtitle, fifth_details,
      sixth_title, sixth_subtitle, sixth_details,
      seventh_title, seventh_subtitle
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM homeschooling_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'homeschooling_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE homeschooling_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?,
      third_title = ?, third_subtitle = ?, third_details = ?,
      fourth_title = ?, fourth_subtitle = ?, fourth_details = ?,
      fifth_title = ?, fifth_subtitle = ?, fifth_details = ?,
      sixth_title = ?, sixth_subtitle = ?, sixth_details = ?,
      seventh_title = ?, seventh_subtitle = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title, 
        fourth_subtitle || existing[0].fourth_subtitle, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        fifth_subtitle || existing[0].fifth_subtitle, 
        fifth_details || existing[0].fifth_details,
        sixth_title || existing[0].sixth_title, 
        sixth_subtitle || existing[0].sixth_subtitle, 
        sixth_details || existing[0].sixth_details,
        seventh_title || existing[0].seventh_title, 
        seventh_subtitle || existing[0].seventh_subtitle, 
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM homeschooling_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating homeschooling_page:', error);
    res.status(500).json({ error: 'Failed to update homeschooling_page' });
  }
});

router.put('/one-on-one', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_subtitle, third_details,
      fourth_title, fourth_details,
      fifth_title, fifth_subtitle, fifth_details,
      sixth_title, sixth_subtitle, sixth_details,
      seventh_title
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM one_on_one_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'one_on_one_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE one_on_one_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?,
      third_title = ?, third_subtitle = ?, third_details = ?,
      fourth_title = ?, fourth_details = ?,
      fifth_title = ?, fifth_subtitle = ?, fifth_details = ?,
      sixth_title = ?, sixth_subtitle = ?, sixth_details = ?,
      seventh_title = ?, seventh_subtitle = ?, seventh_details = ?,
      eighth_title = ?, eighth_subtitle = ?, eighth_details = ?,
      ninth_title = ?, ninth_subtitle = ?, ninth_details = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        fifth_subtitle || existing[0].fifth_subtitle, 
        fifth_details || existing[0].fifth_details,
        sixth_title || existing[0].sixth_title, 
        sixth_subtitle || existing[0].sixth_subtitle, 
        sixth_details || existing[0].sixth_details,
        seventh_title || existing[0].seventh_title,
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM one_on_one_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating one_on_one_page:', error);
    res.status(500).json({ error: 'Failed to update one_on_one_page' });
  }
});

router.put('/combined-classes', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_details,
      fourth_title, fourth_subtitle, fourth_details,
      fifth_title, sixth_title
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM combined_classes_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'combined_classes_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE combined_classes_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?,
      third_title = ?, third_details = ?,
      fourth_title = ?, fourth_subtitle = ?, fourth_details = ?,
      fifth_title = ?, sixth_title = ?`,
      
      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title, 
        fourth_subtitle || existing[0].fourth_subtitle, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        sixth_title || existing[0].sixth_title, 
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM combined_classes_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating combined_classes_page:', error);
    res.status(500).json({ error: 'Failed to update combined_classes_page' });
  }
});

router.put('/standardized-test-prep', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_subtitle, third_details,
      fourth_title, fourth_details,
      fifth_title, fifth_subtitle, fifth_details,
      sixth_title,
      seventh_title, seventh_subtitle,
      eighth_title, eighth_subtitle,
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM standardized_test_prep_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'standardized_test_prep_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE standardized_test_prep_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?,
      third_title = ?, third_subtitle = ?, third_details = ?,
      fourth_title = ?, fourth_subtitle = ?,
      fifth_title = ?, fifth_subtitle = ?, fifth_details = ?,
      sixth_title = ?,
      seventh_title = ?, seventh_subtitle = ?,
      eighth_title = ?, eighth_subtitle = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        fifth_subtitle || existing[0].fifth_subtitle, 
        fifth_details || existing[0].fifth_details,
        sixth_title || existing[0].sixth_title, 
        seventh_title || existing[0].seventh_title, 
        seventh_subtitle || existing[0].seventh_subtitle, 
        eighth_title || existing[0].eighth_title, 
        eighth_subtitle || existing[0].eighth_subtitle, 
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM standardized_test_prep_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating standardized_test_prep_page:', error);
    res.status(500).json({ error: 'Failed to update standardized_test_prep_page' });
  }
});

router.put('/study-coaching', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_subtitle, third_details,
      fourth_title, fourth_subtitle, fourth_details,
      fifth_title, fifth_subtitle,
      sixth_title,
      seventh_title,
      eighth_title
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM study_coaching_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'study_coaching_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE study_coaching_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?, second_details = ?,
      third_title = ?, third_subtitle = ?, third_details = ?,
      fourth_title = ?, fourth_subtitle = ?, fourth_details = ?,
      fifth_title = ?, fifth_subtitle = ?,
      sixth_title = ?,
      seventh_title = ?,
      eighth_title = ?`

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title, 
        fourth_subtitle || existing[0].fourth_subtitle, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        fifth_subtitle || existing[0].fifth_subtitle, 
        sixth_title || existing[0].sixth_title, 
        seventh_title || existing[0].seventh_title, 
        eighth_title || existing[0].eighth_title
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM study_coaching_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating study_coaching_page:', error);
    res.status(500).json({ error: 'Failed to update study_coaching_page' });
  }
});

router.put('/student-activities', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_details,
      fourth_title, fourth_subtitle, fourth_details,
      fifth_title, fifth_subtitle, fifth_details,
      sixth_title,
      seventh_title, seventh_subtitle,
      eighth_title, eighth_subtitle,
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM student_clubs_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'student_clubs_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE student_clubs_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?,
      third_title = ?, third_details = ?,
      fourth_title = ?, fourth_subtitle = ?, fourth_details = ?,
      fifth_title = ?, fifth_subtitle = ?, fifth_details = ?,
      sixth_title = ?,
      seventh_title = ?, seventh_subtitle = ?,
      eighth_title = ?, eighth_subtitle = ?,`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title, 
        fourth_subtitle || existing[0].fourth_subtitle, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        fifth_subtitle || existing[0].fifth_subtitle, 
        fifth_details || existing[0].fifth_details,
        sixth_title || existing[0].sixth_title, 
        seventh_title || existing[0].seventh_title, 
        seventh_subtitle || existing[0].seventh_subtitle, 
        eighth_title || existing[0].eighth_title, 
        eighth_subtitle || existing[0].eighth_subtitle,
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM student_clubs_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating student_clubs_page:', error);
    res.status(500).json({ error: 'Failed to update student_clubs_page' });
  }
});

router.put('/academic-resources', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_subtitle, third_details,
      fourth_title, fourth_subtitle, fourth_details,
      fifth_title,
      sixth_title, sixth_subtitle, sixth_details,
      seventh_title, seventh_subtitle, seventh_details,
      eighth_title, eighth_subtitle
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM academic_resources_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'academic_resources_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE academic_resources_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?,
      third_title = ?, third_subtitle = ?, third_details = ?,
      fourth_title = ?, fourth_subtitle = ?, fourth_details = ?,
      fifth_title = ?,
      sixth_title = ?, sixth_subtitle = ?, sixth_details = ?,
      seventh_title = ?, seventh_subtitle = ?, seventh_details = ?,
      eighth_title = ?, eighth_subtitle = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title, 
        fourth_subtitle || existing[0].fourth_subtitle, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        sixth_title || existing[0].sixth_title, 
        sixth_subtitle || existing[0].sixth_subtitle, 
        sixth_details || existing[0].sixth_details,
        seventh_title || existing[0].seventh_title, 
        seventh_subtitle || existing[0].seventh_subtitle, 
        seventh_details || existing[0].seventh_details,
        eighth_title || existing[0].eighth_title, 
        eighth_subtitle || existing[0].eighth_subtitle
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM academic_resources_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating academic_resources_page:', error);
    res.status(500).json({ error: 'Failed to update academic_resources_page' });
  }
});

router.put('/learn-languages', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_subtitle, third_details,
      fourth_title, fourth_details,
      fifth_title, fifth_subtitle, fifth_details,
      sixth_title, sixth_subtitle,
      seventh_title, seventh_details,
      eighth_title,
      ninth_title, ninth_details,
      tenth_title, tenth_details
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM learn_languages_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'learn_languages_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE learn_languages_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?,
      third_title = ?, third_subtitle = ?, third_details = ?,
      fourth_title = ?, fourth_details = ?,
      fifth_title = ?, fifth_subtitle = ?, fifth_details = ?,
      sixth_title = ?, sixth_subtitle = ?,
      seventh_title = ?, seventh_details = ?,
      eighth_title = ?,
      ninth_title = ?, ninth_details = ?
      tenth_title = ?, tenth_details = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
        third_details || existing[0].third_details,
        fourth_title || existing[0].fourth_title, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        fifth_subtitle || existing[0].fifth_subtitle, 
        fifth_details || existing[0].fifth_details,
        sixth_title || existing[0].sixth_title, 
        sixth_subtitle || existing[0].sixth_subtitle, 
        seventh_title || existing[0].seventh_title, 
        seventh_details || existing[0].seventh_details,
        eighth_title || existing[0].eighth_title, 
        ninth_title || existing[0].ninth_title, 
        ninth_details || existing[0].ninth_details,
        tenth_title || existing[0].tenth_title, 
        tenth_details || existing[0].tenth_details,

      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM learn_languages_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating learn_languages_page', error);
    res.status(500).json({ error: 'Failed to update learn_languages_page' });
  }
});

router.put('/our-staff', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_subtitle,
      third_title, third_subtitle,
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM our_staff_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'our_staff_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE our_staff_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_subtitle = ?,
      third_title = ?, third_subtitle = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM our_staff_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating our_staff_page', error);
    res.status(500).json({ error: 'Failed to update our_staff_page' });
  }
});

router.put('/faqs', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM faqs_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'faqs_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE faqs_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM faqs_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating faqs_page:', error);
    res.status(500).json({ error: 'Failed to update faqs_page' });
  }
});

router.put('/pricing', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle,
      third_title, third_subtitle,
      fourth_title, fourth_details,
      fifth_title, fifth_details,
      sixth_title, sixth_subtitle
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM pricing_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'pricing_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE pricing_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?,
      third_title = ?, third_subtitle = ?,
      fourth_title = ?, fourth_details = ?,
      fifth_title = ?, fifth_details = ?,
      sixth_title = ?, sixth_subtitle = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
        fourth_title || existing[0].fourth_title, 
        fourth_details || existing[0].fourth_details,
        fifth_title ||  existing[0].fifth_title, 
        fifth_details || existing[0].fifth_details,
        sixth_title || existing[0].sixth_title, 
        sixth_subtitle || existing[0].sixth_subtitle
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM pricing_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating pricing_page:', error);
    res.status(500).json({ error: 'Failed to update pricing_page' });
  }
});

router.put('/get-in-touch', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_title, second_subtitle, second_details
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM pricing_page WHERE id = 1'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'pricing_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE pricing_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_title = ?, second_subtitle = ?, second_details = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_title ||  existing[0].second_title,
        second_subtitle || existing[0].second_subtitle, 
        second_details || existing[0].second_details
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM pricing_page WHERE id = 1'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating pricing_page:', error);
    res.status(500).json({ error: 'Failed to update pricing_page' });
  }
});

router.put('/educational-services', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    // const { id } = req.params;
    const { main_title, main_subtitle, main_background_image,
      second_subtitle,
      third_title, third_subtitle
     } = req.body;
    
    // Check if the FAQ exists
    const [existing] = await req.app.locals.db.query(
      'SELECT * FROM educational_services_page WHERE id = 2'
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'educational_services_page not found' });
    }
    
    // Update the FAQ
    await req.app.locals.db.query(
      `UPDATE educational_services_page SET 
      main_title = ?, main_subtitle = ?, main_background_image = ?,
      second_subtitle = ?,
      third_title = ?, third_subtitle = ?`,

      [
        main_title || existing[0].main_title, 
        main_subtitle || existing[0].main_subtitle, 
        main_background_image || existing[0].main_background_image,
        second_subtitle || existing[0].second_subtitle, 
        third_title || existing[0].third_title, 
        third_subtitle || existing[0].third_subtitle, 
      ]
    );
    
    // Get the updated FAQ
    const [updated] = await req.app.locals.db.query(
      'SELECT * FROM educational_services_page WHERE id = 2'
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating educational_services_page:', error);
    res.status(500).json({ error: 'Failed to update educational_services_page' });
  }
});


export default router;