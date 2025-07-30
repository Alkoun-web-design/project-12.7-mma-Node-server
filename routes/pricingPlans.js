// pricingPlans.js
import express from 'express';

const router = express.Router();

// GET all pricing plans
router.get('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const [rows] = await req.app.locals.db.query(
      'SELECT id, name, description, price, annual_price, annual_description, features, popular, link_to FROM pricing_plans WHERE is_active = true ORDER BY order_index'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    res.status(500).json({ error: 'Failed to fetch pricing plans' });
  }
});

// GET pricing plan by ID
router.get('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const [rows] = await req.app.locals.db.query(
      'SELECT * FROM pricing_plans WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pricing plan not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching pricing plan:', error);
    res.status(500).json({ error: 'Failed to fetch pricing plan' });
  }
});

// POST create new pricing plan
router.post('/', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { name, description, price, features, popular } = req.body;

    // Validate required fields
    if (!name || !description || !price || !features) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, description, price, and features are required' 
      });
    }

    // Get the maximum order index to place new plan at the end
    const [maxOrderResult] = await req.app.locals.db.query(
      'SELECT MAX(order_index) as max_order FROM pricing_plans'
    );
    const orderIndex = maxOrderResult[0].max_order ? maxOrderResult[0].max_order + 1 : 1;
    
    // Insert new pricing plan
    const [result] = await req.app.locals.db.query(
      'INSERT INTO pricing_plans (name, description, price, features, popular, order_index) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, JSON.stringify(features), popular || false, orderIndex]
    );

    // Get the newly created pricing plan
    const [newPlan] = await req.app.locals.db.query(
      'SELECT * FROM pricing_plans WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newPlan[0]);
  } catch (error) {
    console.error('Error creating pricing plan:', error);
    res.status(500).json({ error: 'Failed to create pricing plan' });
  }
});

// PUT update pricing plan
router.put('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { id } = req.params;
    const { name, description, price, features, popular } = req.body;

    // Check if plan exists
    const [existingPlan] = await req.app.locals.db.query(
      'SELECT * FROM pricing_plans WHERE id = ?',
      [id]
    );

    if (existingPlan.length === 0) {
      return res.status(404).json({ error: 'Pricing plan not found' });
    }

    // Update the pricing plan
    await req.app.locals.db.query(
      'UPDATE pricing_plans SET name = ?, description = ?, price = ?, features = ?, popular = ? WHERE id = ?',
      [
        name || existingPlan[0].name,
        description || existingPlan[0].description,
        price || existingPlan[0].price,
        features !== undefined ? JSON.stringify(features) : existingPlan[0].features,
        popular !== undefined ? popular : existingPlan[0].popular,
        id
      ]
    );

    // Get the updated pricing plan
    const [updatedPlan] = await req.app.locals.db.query(
      'SELECT * FROM pricing_plans WHERE id = ?',
      [id]
    );

    res.json(updatedPlan[0]);
  } catch (error) {
    console.error('Error updating pricing plan:', error);
    res.status(500).json({ error: 'Failed to update pricing plan' });
  }
});

// DELETE pricing plan (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { id } = req.params;

    // Check if plan exists
    const [existingPlan] = await req.app.locals.db.query(
      'SELECT * FROM pricing_plans WHERE id = ?',
      [id]
    );

    if (existingPlan.length === 0) {
      return res.status(404).json({ error: 'Pricing plan not found' });
    }

    // Soft delete the plan by setting is_active to false
    await req.app.locals.db.query(
      'UPDATE pricing_plans SET is_active = false WHERE id = ?',
      [id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting pricing plan:', error);
    res.status(500).json({ error: 'Failed to delete pricing plan' });
  }
});

// PUT update order of pricing plans
router.put('/reorder', async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const { planIds } = req.body;

    // Validate required fields
    if (!planIds || !Array.isArray(planIds) || planIds.length === 0) {
      return res.status(400).json({ 
        error: 'planIds must be a non-empty array' 
      });
    }

    // Update order index for each plan
    const promises = planIds.map((id, index) => {
      const orderIndex = index + 1;
      return req.app.locals.db.query(
        'UPDATE pricing_plans SET order_index = ? WHERE id = ?',
        [orderIndex, id]
      );
    });

    await Promise.all(promises);
    res.json({ success: true });
  } catch (error) {
    console.error('Error reordering pricing plans:', error);
    res.status(500).json({ error: 'Failed to reorder pricing plans' });
  }
});

export default router;