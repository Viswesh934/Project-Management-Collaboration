const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/Project');

router.post('/createproject', projectController.createProject);
router.get('/allprojects', projectController.getAllProjects);
router.put('/editproject/:id', projectController.editProject);
router.delete('/deleteproject/:id', projectController.deleteProject);

module.exports = router;
