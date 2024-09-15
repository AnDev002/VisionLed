import axios from "axios"

export const GetAllCollection = async () => {
    const res = await axios.get(`https://api.visionled.vn/api/collection/get-all`)
    return res.data;
}

export const GetCollection = async (id) => {
    const res = await axios.get(`https://api.visionled.vn/api/collection/get-one/${id}`)
    return res.data;
}


export const CreateCollection = async (data) => {
    const res = await axios.post(`https://api.visionled.vn/api/collection/create-collection`, data)
    return res.data;
}


export const updateCollection = async ({ id, access_token, data }) => {
    const res = await axios.put(`https://api.visionled.vn/api/collection/update-collection/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}


export const DeleteCollection = async ({ id, access_token }) => {
    const res = await axios.delete(`https://api.visionled.vn/api/collection/delete-collection/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
