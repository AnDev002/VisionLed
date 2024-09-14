import axios from "axios"

export const CreateOrder = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/order/create-order`, data)
    return res.data;
}

export const GetOrders = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/order/get-orders`)
    return res.data;
}

export const GetOrder = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/order/get-order/${id}`)
    return res.data;
}

export const GetLastestOrder = async (customerId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/order/get-lastest-order/${customerId}`)
    return res.data;
}

export const UpdateOrder = async ({id, orderState}) => {
    const res = await axios.put(`${process.env.REACT_APP_API_KEY}/order/update-order/${id}`, orderState)
    return res.data;
}

export const DeleteOrder = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_KEY}/order/delete-order/${id}`)
    return res.data;
}