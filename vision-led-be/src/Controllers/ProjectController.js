const ProjectServices = require('../Services/ProjectServices')

const getProjects = async (req, res) => {
    try {
        const response = await ProjectServices.getProjects();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createProject = async (req, res) => {
    try {
        const { name, description, image } = req.body
        if (!name || !description || !image) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProjectServices.createProject(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createProjectDetails = async (req, res) => {
    try {
        const project = req.params.id
        if (!project || !req.body) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProjectServices.createProjectDetails(project, req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getProjectDetails = async (req, res) => {
    try {
        const projectID = req.params.id
        if (!projectID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProjectServices.getProjectDetails(projectID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateProject = async (req, res) => {
    try {
        const projectID = req.params.id
        const updateData = req.body
        const response = await ProjectServices.updateProject(projectID, updateData);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateProjectDetails = async (req, res) => {
    try {
        const projectDetailsID = req.params.id
        const updateData = req.body
        const response = await ProjectServices.updateProjectDetails(projectDetailsID, updateData);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const projectID = req.params.id
        const response = await ProjectServices.deleteProject(projectID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    getProjects,
    getProjectDetails,
    createProject,
    createProjectDetails,
    updateProject,
    updateProjectDetails,
    deleteProject
}