// servicePricing.js
import express from 'express';

const router = express.Router();

// GET all service pricing
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    // const [rows] = await req.app.locals.db.query(
    //   'SELECT * FROM service_pricing WHERE is_active = true ORDER BY order_index'
    // );

    const rows = req.app.locals.db.prepare(
      'SELECT * FROM service_pricing WHERE is_active = true ORDER BY order_index'
    );
    // res.json(rows);
    res.json(rows.all());
  } catch (error) {
    console.error('Error fetching service pricing:', error);
    res.status(500).json({ error: 'Failed to fetch service pricing' });
  }
});

// GET service pricing by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    // const [rows] = await req.app.locals.db.query(
    //   'SELECT * FROM service_pricing WHERE id = ?',
    //   [req.params.id]
    // );

    const rows = req.app.locals.db.prepare(
      'SELECT * FROM service_pricing WHERE id = ?',
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service pricing not found' });
    }

    // res.json(rows[0]);
    res.json(rows.get(req.params.id));
  } catch (error) {
    console.error('Error fetching service pricing:', error);
    res.status(500).json({ error: 'Failed to fetch service pricing' });
  }
});

// POST create new service pricing
router.post('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { service, description, individual, package: packagePrice, link_to } = req.body;

    // Validate required fields
    if (!service || !description || !individual || !packagePrice) {
      return res.status(400).json({ 
        error: 'Missing required fields: service, description, individual, and package are required' 
      });
    }

    // Get the maximum order index to place new plan at the end
    const [maxOrderResult] = await req.app.locals.db.query(
      'SELECT MAX(order_index) as max_order FROM service_pricing'
    );
    const orderIndex = maxOrderResult[0].max_order ? maxOrderResult[0].max_order + 1 : 1;
    
    // Insert new service pricing
    const [result] = await req.app.locals.db.query(
      'INSERT INTO service_pricing (service, description, individual, package, link_to, order_index) VALUES (?, ?, ?, ?, ?, ?)',
      [service, description, individual, packagePrice, link_to, orderIndex]
    );

    // Get the newly created service pricing
    const [newPricing] = await req.app.locals.db.query(
      'SELECT * FROM service_pricing WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newPricing[0]);
  } catch (error) {
    console.error('Error creating service pricing:', error);
    res.status(500).json({ error: 'Failed to create service pricing' });
  }
});

// PUT update service pricing
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { id } = req.params;
    const { service, description, individual, package: packagePrice, link_to } = req.body;

    // Check if pricing exists
    const [existingPricing] = await req.app.locals.db.query(
      'SELECT * FROM service_pricing WHERE id = ?',
      [id]
    );

    if (existingPricing.length === 0) {
      return res.status(404).json({ error: 'Service pricing not found' });
    }

    // Update the service pricing
    await req.app.locals.db.query(
      'UPDATE service_pricing SET service = ?, description = ?, individual = ?, package = ?, link_to = ? WHERE id = ?',
      [
        service || existingPricing[0].service,
        description || existingPricing[0].description,
        individual || existingPricing[0].individual,
        packagePrice !== undefined ? packagePrice : existingPricing[0].package,
        link_to !== undefined ? link_to : existingPricing[0].link_to,
        id
      ]
    );

    // Get the updated service pricing
    const [updatedPricing] = await req.app.locals.db.query(
      'SELECT * FROM service_pricing WHERE id = ?',
      [id]
    );

    res.json(updatedPricing[0]);
  } catch (error) {
    console.error('Error updating service pricing:', error);
    res.status(500).json({ error: 'Failed to update service pricing' });
  }
});

// DELETE service pricing (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { id } = req.params;

    // Check if pricing exists
    const [existingPricing] = await req.app.locals.db.query(
      'SELECT * FROM service_pricing WHERE id = ?',
      [id]
    );

    if (existingPricing.length === 0) {
      return res.status(404).json({ error: 'Service pricing not found' });
    }

    // Soft delete the pricing by setting is_active to false
    await req.app.locals.db.query(
      'UPDATE service_pricing SET is_active = false WHERE id = ?',
      [id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting service pricing:', error);
    res.status(500).json({ error: 'Failed to delete service pricing' });
  }
});

// PUT update order of service pricings
router.put('/reorder', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { pricingIds } = req.body;

    // Validate required fields
    if (!pricingIds || !Array.isArray(pricingIds) || pricingIds.length === 0) {
      return res.status(400).json({ 
        error: 'pricingIds must be a non-empty array' 
      });
    }

    // Update order index for each pricing
    const promises = pricingIds.map((id, index) => {
      const orderIndex = index + 1;
      return req.app.locals.db.query(
        'UPDATE service_pricing SET order_index = ? WHERE id = ?',
        [orderIndex, id]
      );
    });

    await Promise.all(promises);
    res.json({ success: true });
  } catch (error) {
    console.error('Error reordering service pricing:', error);
    res.status(500).json({ error: 'Failed to reorder service pricing' });
  }
});

export default router;