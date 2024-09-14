const Project = require("../Models/Project")
const mongoose = require('mongoose');
const generateImageFileName = require("../Ults/GenerateImageFileName");
const gcp = require("../Services/GoogleCloudService");

const getProjects = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const projects = await Project.Project.find()
            resolve({
                status: "OK",
                message: "GET PROJECTS SUCCESS",
                data: projects
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const createProject = (newProject) => {
    return new Promise(async (resolve, reject) => {
        const { name, description, image } = newProject
        try {
            const generateImgFileName = generateImageFileName();
            const imageUrl = await gcp.uploadToGCP(image, generateImgFileName);
            const createdProject = await Project.Project.create({
                name, image: imageUrl, description
            })
            if (createdProject) {
                resolve({
                    status: "OK",
                    message: "CREATE COLLECTION SUCCESS",
                    data: createdProject
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const createProjectDetails = (projectId, newProjectDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProject = await Project.Project.find({
                _id: projectId
            })
            if (!checkProject) {
                reject({
                    status: "ERR",
                    message: "Project Id is not defined"
                })
            }
            const imgUrlArr = []
            await Promise.all(newProjectDetails?.map(async (item) => {
                const generateImgFileName = generateImageFileName();
                const imageUrl = await gcp.uploadToGCP(item.image, generateImgFileName);
                imgUrlArr.push(imageUrl);
            }));

            const createData = newProjectDetails.map((item, index) => ({
                project: projectId,
                image: imgUrlArr[index] ? imgUrlArr[index] : undefined,
                description: item.description
            }))

            const createdProject = await Project.ProjectDetails.create(createData)
            if (createdProject) {
                resolve({
                    status: "OK",
                    message: "CREATE PROJECT IMAGE SUCCESS",
                    data: createdProject
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const getProjectDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProject = Project.ProjectDetails.find({
                project: id
            }).populate("project").exec()
                .then((result) => {
                    resolve({
                        status: "OK",
                        message: "GET PROJECT DETAILS SUCCESS",
                        data: result
                    })
                })
                .catch((error) => {
                    reject({
                        status: "ERR",
                        message: "the project id is not defined"
                    })
                });
            if (checkProject === null) {
                reject({
                    status: "ERR",
                    message: "the project id is not defined"
                })
            }


        } catch (error) {
            console.log(error);
        }
    })
}

const updateProject = (id, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProject = Project.Project.findOne({
                _id: id
            })

            if (checkProject === null) {
                resolve({
                    status: "ERR",
                    message: "the project id is not defined"
                })
            }

            if (updateData.image) {
                if (Buffer.from(updateData.image, 'base64').toString('base64') !== updateData.image) {
                    const generateImgFileName = generateImageFileName();
                    const imageUrl = await gcp.uploadToGCP(updateData.image, generateImgFileName);
                    updateData.image = imageUrl
                }
            }

            const updatedProject = await Project.Project.findByIdAndUpdate(id, updateData, { new: true })

            resolve({
                status: "OK",
                message: "UPDATE PROJECT SUCCESS",
                data: updatedProject
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const updateProjectDetails = (id, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProjectDetails = Project.ProjectDetails.findOne({
                _id: id
            })

            if (checkProjectDetails === null) {
                resolve({
                    status: "ERR",
                    message: "the project details id is not defined"
                })
            }

            if (updateData[0].image || updateData[1].image || updateData[2].image || updateData[3].image || updateData[4].image || updateData[5].image || updateData[6].image || updateData[7].image) {
                const imgUrlArr = []
                await Promise.all(updateData?.map(async (item) => {
                    if (Buffer.from(item.image, 'base64').toString('base64') !== item.image) {
                        const generateImgFileName = generateImageFileName();
                        const imageUrl = await gcp.uploadToGCP(item.image, generateImgFileName);
                        imgUrlArr.push(imageUrl);
                    }
                }));
                updateData = updateData.map((item, index) => ({
                    project: id,
                    image: imgUrlArr[index] ? imgUrlArr[index] : undefined,
                    description: item.description
                }))
            }
            
            const updatedProjectDetails = await Project.ProjectDetails.findByIdAndUpdate(id, updateData, { new: true })

            resolve({
                status: "OK",
                message: "UPDATE PROJECT DETAILS SUCCESS",
                data: updatedProjectDetails
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const deleteProject = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProject = Project.Project.findOne({
                _id: id
            })

            if (checkProject === null) {
                resolve({
                    status: "ERR",
                    message: "the project id is not defined"
                })
            }

            await Project.Project.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "DELETE PROJECT SUCCESS"
            })
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = {
    getProjects,
    getProjectDetails,
    createProject,
    updateProject,
    updateProjectDetails,
    deleteProject,
    createProjectDetails
}