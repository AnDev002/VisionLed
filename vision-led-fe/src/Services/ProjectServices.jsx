import axios from "axios"

export const GetAllProject = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/project/get-all`)
    return res.data;
}

export const GetProjectDetails = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/project/get-project-details/${id}`)
    return res.data;
}

export const CreateProject = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/project/create-project/`, data)
    return res.data;
}

export const CreateProjectDetails = async ({ id, projectDetailsState }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/project/create-project-details/${id.projectId}`, projectDetailsState)
    return res.data;
}

export const DeleteProject = async ({ id, access_token }) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_KEY}/project/delete-project/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
