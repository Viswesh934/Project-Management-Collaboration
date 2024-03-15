//routes for organization

var express = require('express');
var router = express.Router();

const {signup, login} = require('../Controllers/OrganizationController');

router.post('/org/signup', signup);
router.post('/org/login', login);

module.exports = router;