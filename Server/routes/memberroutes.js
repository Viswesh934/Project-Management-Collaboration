const express = require('express');
const router = express.Router();
const memberController = require('../Controllers/MemberController');
const ContactUsController = require('../Controllers/ContactUsController');
const cookeParser = require('cookie-parser');

router.use(cookeParser());
router.use(express.json());
router.post('/signup', memberController.memberSignup);
router.post('/login', memberController.memberLogin);
router.post('/logout', memberController.memberLogout);
router.post('/contactus', ContactUsController.contactUs);

module.exports = router;