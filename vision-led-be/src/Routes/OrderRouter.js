const express = require("express")
const router = express.Router()
const orderController = require('../Controllers/OrderController')

router.post('/create-order', orderController.createOrder)
router.put('/update-order/:id', orderController.updateOrder)
router.delete('/delete-order/:id', orderController.deleteOrder)
router.get('/get-orders', orderController.getOrders)
router.get('/get-order/:id', orderController.getOrders)
router.get('/get-lastest-order/:customerId', orderController.getLastestOrder)
module.exports = router