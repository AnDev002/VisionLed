const OrderServices = require('../Services/OrderServices')

const createOrder = async (req, res) => {
    try {
        const { orderItems, phoneNumber, customerName, email, address, paymentMethod, orderId, customerId } = req.body
        if (!orderItems || !phoneNumber || !customerName || !address || !paymentMethod || !orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderServices.createOrder(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const updateData = req.body
        if (!orderId || !updateData) {
            return res.status(200).json({
                message: "The input is required"
            })
        }
        const response = await OrderServices.updateOrder(orderId, updateData);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateOrderCustomer = async (req, res) => {
    try {
        const orderId = req.params.id
        const { customer } = req.body
        if (!orderId || !updateData) {
            return res.status(200).json({
                message: "The input is required"
            })
        }
        const response = await OrderServices.updateOrder(orderId, customer);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getOrders = async (req, res) => {
    try {
        const response = await OrderServices.getOrders();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const response = await OrderServices.getOrder(orderId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getLastestOrder = async (req, res) => {
    try {
        const customerId = req.params.customerId
        if(!customerId) {
            return res.status(404).json({
                status: "err",
                message: "invalid user"
            })
        }
        const response = await OrderServices.getLastestOrder(customerId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        
        const response = await OrderServices.deleteOrder(orderId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrder,
    updateOrderCustomer,
    getLastestOrder
}