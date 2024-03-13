const express = require('express');
const router = express.Router();
const memberController = require('../Controllers/MemberController');

router.use(express.json());
router.post('/signup', memberController.memberSignup);
router.post('/login', memberController.memberLogin);
router.post('/logout', memberController.memberLogout);

module.exports = router;