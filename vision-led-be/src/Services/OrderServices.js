const Order = require('../Models/Order')
const User = require('../Models/User')
const convertToOrderItems = require('../Ults/OrderItemsWithQuantity')

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, phoneNumber, customerName, email, address, paymentMethod, description, orderId, customerId } = newOrder
        try {
            const checkUser = await User.findOne({
                _id: customerId
            })
            let createdUser = null;
            if (!checkUser) {
                createdUser = await User.create({
                    phone: phoneNumber,
                    name: customerName,
                    address: address,
                    email: email ? email : null
                })
            } else {
                createdUser = await User.findByIdAndUpdate(customerId, {
                    phone: phoneNumber,
                    name: customerName,
                    address: address,
                    email: email
                }, { new: true })
            }
            const updatedOrderItems = orderItems.map(orderItem => {
                return Array.from({ length: orderItem.quantity }, () => orderItem.productDetails);
            });
            const combinedArray = updatedOrderItems.reduce((acc, val) => acc.concat(val), []);

            const createdOrder = await Order.create({
                orderId,
                orderItems: combinedArray,
                paymentMethod,
                description,
                customer: createdUser._id
            })
            resolve({
                status: "OK",
                message: "CREATE ORDER SUCCESS",
                data: createdOrder
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const orders = await Order.find().populate("customer").populate("orderItems").populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    model: "Product"
                }
            })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "power",
                        model: "ProductPower"
                    }
                })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "size",
                        model: "ProductSize"
                    }
                })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "color",
                        model: "ProductColor"
                    }
                })


            const ordersWithOrderItems = orders.map(order => {
                const orderItems = convertToOrderItems(order.orderItems);
                return { ...order, orderItems };
            });


            const updatedOrders = ordersWithOrderItems.map(order => {
                order._doc.orderItems = order.orderItems;
                return order;
            });

            const orderItemsDocs = updatedOrders.map(item => item._doc);
            resolve({
                status: "OK",
                message: "GET ORDERS SUCCESS",
                data: orderItemsDocs
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                _id: id
            })
            resolve({
                status: "OK",
                message: "GET ORDER BY ID SUCCESS",
                data: order
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getLastestOrder = (customerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orders = await Order.find({ customer: customerId, status: { $ne: 'COMPLETED' } }).populate("customer").populate("orderItems").populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    model: "Product"
                }
            })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "power",
                        model: "ProductPower"
                    }
                })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "size",
                        model: "ProductSize"
                    }
                })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "color",
                        model: "ProductColor"
                    }
                })
            if (orders === null) {
                resolve({
                    status: "OK",
                    message: "Not have order",
                    data: []
                })
            }

            const ordersWithOrderItems = orders.map(order => {
                const orderItems = convertToOrderItems(order.orderItems);
                return { ...order, orderItems };
            });


            const updatedOrders = ordersWithOrderItems.map(order => {
                order._doc.orderItems = order.orderItems;
                return order;
            });

            const orderItemsDocs = updatedOrders.map(item => item._doc);

            resolve({
                status: "OK",
                message: "GET ORDER BY ID SUCCESS",
                data: orderItemsDocs
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const updateOrderCustomer = (id, customerData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = Order.findOne({
                _id: id
            })

            if (checkOrder === null) {
                resolve({
                    status: "ERR",
                    message: "the order id is not defined"
                })
            }
            const checkCustomer = User.findOne({
                _id: checkCustomer.id
            })


            if (checkCustomer === null) {
                resolve({
                    status: "ERR",
                    message: "the customer id is not defined"
                })
            }

            const updatedOrderCustomer = await Order.findByIdAndUpdate(id, { customer: checkCustomer }, { new: true })

            resolve({
                status: "OK",
                message: "UPDATE ORDER CUSTOMER SUCCESS",
                data: updatedOrderCustomer
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const updateOrder = (id, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = Order.findOne({
                _id: id
            })

            if (checkOrder === null) {
                resolve({
                    status: "ERR",
                    message: "the order id is not defined"
                })
            }

            const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true })

            resolve({
                status: "OK",
                message: "UPDATE ORDER SUCCESS",
                data: updatedOrder
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = Order.findOne({
                _id: id
            })

            if (checkOrder === null) {
                resolve({
                    status: "ERR",
                    message: "the order id is not defined"
                })
            }

            await Order.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "DELETE ORDER SUCCESS",
            })
        } catch (error) {
            console.log(error);
        }
    })
}


module.exports = {
    createOrder,
    getOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    updateOrderCustomer,
    getLastestOrder
}