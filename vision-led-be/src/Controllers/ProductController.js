const ProductServices = require('../Services/ProductServices')

const createProductCollection = async (req, res) => {
    const { collectionImage, collectionName, collectionDescription } = req.body
    try {
        if (!collectionImage || !collectionName) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductServices.createProductCollection(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getProductByType = async (req, res) => {
    const id = req.params.id
    try {
        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The id is required'
            })
        }
        const response = await ProductServices.getProductByType(id);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createProductColor = async (req, res) => {
    const { colorName } = req.body
    try {
        if (!colorName) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductServices.createProductColor(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createProductPower = async (req, res) => {
    const { powerValue } = req.body
    try {
        if (!powerValue) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductServices.createProductPower(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createProductType = async (req, res) => {
    const { typeName } = req.body
    try {
        if (!typeName) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductServices.createProductType(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createProductSize = async (req, res) => {
    const { sizeName } = req.body
    try {
        if (!sizeName) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductServices.createProductSize(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createProductDetails = async (req, res) => {
    const {
        product,
        power,
        size,
        color,
        voltage,
        CRI,
        dimension,
        hole_dimension,
        chip_led,
        projection_angle,
        lumens_color_temperature,
        warranty,
        luminous_flux,
        unit_price,
        product_type,
        image,
        countInStock } = req.body
    try {
        if (!product || !countInStock || !unit_price) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductServices.createProductDetails(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createProduct = async (req, res) => {
    const { name, image, product_type, collection, sale_rate, protection_rating, description } = req.body
    try {
        if (!name || !image || !product_type) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductServices.createProduct(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const extractFiltersFromQuery = (query) => {
    const filters = [];

    for (const key in query) {
        if (key.startsWith('filter')) {
            const value = query[key].split(':');
            if (value.length === 2) {
                const filterObj = { [value[0]]: value[1] };
                filters.push(filterObj);
            }
        }
    }

    return filters;
};



const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        if (filter !== undefined) {

            let filterQuery = {

            }
            if (Array.isArray(filter)) {
                filter.forEach(f => {
                    const [key, value] = f.split(':');
                    filterQuery[key] = value;
                });
            } else {
                const [key, value] = filter.split(':');
                filterQuery[key] = value;
            }
            const response = await ProductServices.getAllProduct(Number(limit) || 12, Number(page) || 0, sort, filterQuery);
            return res.status(200).json(response)
        } else {
            const response = await ProductServices.getAllProduct(Number(limit) || 12, Number(page) || 0, sort, filter);
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const findHighestPriceProduct = async (req, res) => {
    try {
        const response = await ProductServices.findHighestPriceProduct();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const findLowestPriceProduct = async (req, res) => {
    try {
        const response = await ProductServices.findLowestPriceProduct();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


const getAllProductType = async (req, res) => {
    try {
        const response = await ProductServices.getAllProductType();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getProductDetails = async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID || productID === "null") {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product id is required'
            })
        }
        const response = await ProductServices.getProductDetails(productID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getRandomProduct = async (req, res) => {
    try {
        const response = await ProductServices.getRandomProduct();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product id is required'
            })
        }
        const response = await ProductServices.getProduct(productID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productID = req.params.id
        const data = req.body
        if (!productID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product id is required'
            })
        }
        const response = await ProductServices.updateProduct(productID, data);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            })
        }
        const response = await ProductServices.deleteProduct(productID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateProductDetails = async (req, res) => {
    try {
        const productDetailsID = req.params.id
        const data = req.body
        if (!productDetailsID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product id is required'
            })
        }
        const response = await ProductServices.updateProductDetails(productDetailsID, data);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteProductDetails = async (req, res) => {
    try {
        const productDetailsID = req.params.id
        if (!productDetailsID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product details id is required'
            })
        }
        const response = await ProductServices.deleteProductDetails(productDetailsID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getProductRefProps = async (req, res) => {
    try {
        const response = await ProductServices.getProductRefProps();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}



module.exports = {
    createProduct,
    createProductColor,
    createProductPower,
    createProductSize,
    createProductDetails,
    getAllProduct,
    getProductDetails,
    updateProduct,
    updateProductDetails,
    deleteProduct,
    deleteProductDetails,
    createProductCollection,
    getAllProductType,
    getProduct,
    createProductType,
    findLowestPriceProduct,
    findHighestPriceProduct,
    getProductRefProps,
    getProductByType,
    getRandomProduct
}