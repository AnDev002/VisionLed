const express = require("express")
const router = express.Router()
const projectController = require('../Controllers/ProjectController')

router.get('/get-all', projectController.getProjects)
router.get('/get-project-details/:id', projectController.getProjectDetails)
router.post('/create-project', projectController.createProject)
router.post('/create-project-details/:id', projectController.createProjectDetails)
router.put('/update-project/:id', projectController.updateProject)
router.put('/update-project-details/:id', projectController.updateProjectDetails)
router.delete('/delete-project/:id', projectController.deleteProject)

module.exports = router