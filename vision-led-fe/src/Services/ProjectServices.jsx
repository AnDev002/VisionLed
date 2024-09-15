import axios from "axios"

export const GetAllProject = async () => {
    const res = await axios.get(`https://api.visionled.vn/api/project/get-all`)
    return res.data;
}

export const GetProjectDetails = async (id) => {
    const res = await axios.get(`https://api.visionled.vn/api/project/get-project-details/${id}`)
    return res.data;
}

export const CreateProject = async (data) => {
    const res = await axios.post(`https://api.visionled.vn/api/project/create-project/`, data)
    return res.data;
}

export const CreateProjectDetails = async ({ id, projectDetailsState }) => {
    const res = await axios.post(`https://api.visionled.vn/api/project/create-project-details/${id.projectId}`, projectDetailsState)
    return res.data;
}

export const DeleteProject = async ({ id, access_token }) => {
    const res = await axios.delete(`https://api.visionled.vn/api/project/delete-project/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
