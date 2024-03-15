//routes for organization

var express = require('express');
var router = express.Router();


const {signup, login, getOrganizationProfile, updateOrganizationProfile} = require('../Controllers/OrganizationController');
const { get } = require('mongoose');

router.post('/org/signup', signup);
router.post('/org/login', login);
router.post('/org/logout', login);
router.get('/org/profile', getOrganizationProfile);
router.put('/org/editprofile', updateOrganizationProfile);


module.exports = router;