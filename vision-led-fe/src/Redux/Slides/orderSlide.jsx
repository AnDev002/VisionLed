import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    shippingAddress: {},
    itemName: "",
    main_image: "",
    product_type: "",
    totalPrice: 0,
    paymentMethod: "COD",
    orderId: 0
}

export const orderSlide = createSlice({
    name: "order",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems.find((item) => item?.productDetails === orderItem.productDetails)
            if (itemOrder) {
                itemOrder.quantity += orderItem.quantity
            } else {
                state?.orderItems.push(orderItem)
            }
        },
        removeProduct: (state, action) => {
            const { productId } = action.payload
            return { ...state, orderItems: state?.orderItems?.filter((item) => item?.productDetails !== productId) };
        },
        changeQuantity: (state, action) => {
            const { quantity, productId } = action.payload
            const itemOrder = state?.orderItems.find((item) => item?.productDetails === productId)
            if (itemOrder) {
                itemOrder.quantity = quantity
            }
        },
        getTotalPrice: (state) => {
            const total = state.orderItems.reduce((acc, item) => acc + item.sale_price * item.quantity, 0);
            return { ...state, totalPrice: total };
        },
        updatePaymentMethod: (state, action) => {
            const { paymentMethod, orderId } = action.payload
            return { ...state, paymentMethod: paymentMethod, orderId: orderId };
        },
        resetOrder: (state) => {
            state.orderItems = []
            state.shippingAddress = {}
            state.itemName = ""
            state.main_image = ""
            state.product_type = ""
            state.totalPrice = 0
            state.paymentMethod = "COD"
            state.orderId = 0
        }
    }
})

export const { addProduct, removeProduct, changeQuantity, getTotalPrice, resetOrder, updatePaymentMethod } = orderSlide.actions

export default orderSlide.reducer