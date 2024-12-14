import axios from "axios"

export const GetAllProduct = async (search, collectionId, typeId, minPrice, maxPrice, powerId, colorId, sort, page, rowsPerPage) => {
    let res = {}
    let queryString = `https://api.tamanhlighting.com/api/product/get-all?page=${page}&limit=${rowsPerPage}`
    if (sort) {
        if (sort === "min_price") {
            queryString += `&sort=asc&sort=min_price`
        }
        if (sort === "max_price") {
            queryString += `&sort=desc&sort=max_price`
        }
    } else {
        if (search) {
            queryString += `&filter=name:${search}`
        }
        if (collectionId && collectionId !== "0" && collectionId !== 0) {
            queryString += `&filter=collection:${collectionId}`
        }
        if (typeId && typeId !== "0" && typeId !== 0) {
            queryString += `&filter=product_type:${typeId}`
        }
        if (minPrice != '' && maxPrice != '' && minPrice && maxPrice) {
            queryString += `&filter=min_price:${minPrice}&filter=max_price:${maxPrice}`
        }
        if (powerId !== 0 && powerId) {
            queryString += `&filter=power:${powerId}`
        }
        if (colorId !== 0 && colorId) {
            queryString += `&filter=color:${colorId}`
        }
    }
    res = await axios.get(queryString)
    return res.data;
}

export const GetProduct = async (id) => {
    const res = await axios.get(`https://api.tamanhlighting.com/api/product/get-product/${id}`)
    return res.data;
}

export const getAllProductType = async () => {
    const res = await axios.get(`https://api.tamanhlighting.com/api/product/get-all-product-type`)
    return res.data;
}

export const GetProductRefProps = async () => {
    const res = await axios.get(`https://api.tamanhlighting.com/api/product/get-product-ref-props`)
    return res.data;
}
export const GetProductDetails = async (id) => {
    let res = {};
    if (id !== null && id !== "null") {
        res = await axios.get(`https://api.tamanhlighting.com/api/product/get-product-details/${id}`)
    }
    return res.data;
}
export const GetProductsByType = async (id) => {
    let res = {};
    if (id !== null && id !== "null") {
        res = await axios.get(`https://api.tamanhlighting.com/api/product/get-products-by-type/${id}`)
    }
    return res.data;
}
export const GetRandomProducts = async () => {
    const res = await axios.get(`https://api.tamanhlighting.com/api/product/get-random-products`)
    return res.data
}

// router.post('/create-color', productController.createProductColor)
// router.post('/create-size', productController.createProductSize)
// router.post('/create-power', productController.createProductPower)
// router.post('/create-product', productController.createProduct)
// router.post('/create-product-details', productController.createProductDetails)
// router.post('/create-product-type', productController.createProductType)

export const CreateProductType = async (data) => {
    const res = await axios.post(`https://api.tamanhlighting.com/api/product/create-product-type`, data)
    return res.data
}

export const CreateProductColor = async (data) => {
    const res = await axios.post(`https://api.tamanhlighting.com/api/product/create-color`, data)
    return res.data
}

export const CreateProductPower = async (data) => {
    const res = await axios.post(`https://api.tamanhlighting.com/api/product/create-power`, data)
    return res.data
}

export const CreateProduct = async (data) => {
    const res = await axios.post(`https://api.tamanhlighting.com/api/product/create-product`, data)
    return res.data
}

export const CreateProductDetails = async (data) => {
    const res = await axios.post(`https://api.tamanhlighting.com/api/product/create-product-details`, data)
    return res.data
}

export const UpdateProduct = async ({ id, access_token, data }) => {
    const res = await axios.put(`https://api.tamanhlighting.com/api/product/update-product/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const UpdateProductDetails = async (dataDetails) => {
    const { id, access_token, ...data } = dataDetails
    const res = await axios.put(`https://api.tamanhlighting.com/api/product/update-product-details/${id}`, data.data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const DeleteProduct = async ({ id, access_token }) => {
    const res = await axios.delete(`https://api.tamanhlighting.com/api/product/delete-product/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
