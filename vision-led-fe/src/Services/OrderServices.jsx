import axios from "axios"

export const CreateOrder = async (data) => {
    const res = await axios.post(`https://api.visionled.vn/api/order/create-order`, data)
    return res.data;
}

export const GetOrders = async () => {
    const res = await axios.get(`https://api.visionled.vn/api/order/get-orders`)
    return res.data;
}

export const GetOrder = async (id) => {
    const res = await axios.get(`https://api.visionled.vn/api/order/get-order/${id}`)
    return res.data;
}

export const GetLastestOrder = async (customerId) => {
    const res = await axios.get(`https://api.visionled.vn/api/order/get-lastest-order/${customerId}`)
    return res.data;
}

export const UpdateOrder = async ({id, orderState}) => {
    const res = await axios.put(`https://api.visionled.vn/api/order/update-order/${id}`, orderState)
    return res.data;
}

export const DeleteOrder = async (id) => {
    const res = await axios.delete(`https://api.visionled.vn/api/order/delete-order/${id}`)
    return res.data;
}
