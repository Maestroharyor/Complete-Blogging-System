const express = require('express');
const blogControllers = require('../controllers/blogControllers')


const router = express.Router()

//Blog Pages

router.get('/', blogControllers.blog_index)

router.post('/', blogControllers.blog_create)

router.delete('/:id', blogControllers.blog_delete)

router.get('/:id', blogControllers.blog_single)

router.put('/update', blogControllers.blog_update)


module.exports = router;