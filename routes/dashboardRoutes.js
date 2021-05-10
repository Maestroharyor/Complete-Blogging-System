const express = require('express');
const dashboardControllers = require('../controllers/dashboardControllers')

const router = express.Router()

router.get('/', dashboardControllers.dashboard_index)

router.get('/add', dashboardControllers.dashboard_add)

router.get('/update/:id', dashboardControllers.dashboard_update_load);

// router.put('/update/:id', dashboardControllers.dashboard_update_update)

module.exports = router