const express = require('express')
const router = express.Router()

const { saysHi } = require('../controllers/user')

router.get('/', saysHi); 

module.exports = router;

