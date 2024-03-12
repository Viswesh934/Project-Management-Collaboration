//routes for organization

var express = require('express');
var router = express.Router();
// login and signup of organization

const { signup, login } = require('../controllers/org_authcontroller');

router.post('/org/signup', signup);
router.post('/org/login', login);

module.exports = router;