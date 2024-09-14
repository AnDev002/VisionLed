const Collection = require('../Models/Collection')
const Product = require('../Models/Product')
const redis = require('redis')
const gcp = require('../Services/GoogleCloudService')
const generateImageFileName = require('../Ults/GenerateImageFileName')
const client = redis.createClient()

const createProductColor = (newColor) => {
    return new Promise(async (resolve, reject) => {
        const { colorName } = newColor
        try {
            const checkColor = await Product.ProductColor.findOne({
                colorName: colorName
            })
            if (checkColor !== null) {
                resolve({
                    status: "OK",
                    message: "the color is already"
                })
            }
            const createdColor = await Product.ProductColor.create({
                colorName: colorName
            })
            if (createdColor) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdColor
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const createProductType = (newType) => {
    return new Promise(async (resolve, reject) => {
        const { typeName } = newType
        try {
            const checkType = await Product.ProductType.findOne({
                typeName: typeName
            })
            if (checkType !== null) {
                resolve({
                    status: "OK",
                    message: "the type is already"
                })
            }
            const createdType = await Product.ProductType.create({
                typeName: typeName
            })
            if (createdType) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdType
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const createProductPower = (newPower) => {
    return new Promise(async (resolve, reject) => {
        const { powerValue } = newPower
        try {
            const checkPower = await Product.ProductPower.findOne({
                powerValue: powerValue
            })
            if (checkPower !== null) {
                resolve({
                    status: "OK",
                    message: "the power is already"
                })
            }
            const createdPower = await Product.ProductPower.create({
                powerValue: powerValue
            })
            if (createdPower) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdPower
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const createProductSize = (newSize) => {
    return new Promise(async (resolve, reject) => {
        const { sizeName } = newSize
        try {
            const checkSize = await Product.ProductSize.findOne({
                sizeName: sizeName
            })
            if (checkSize !== null) {
                resolve({
                    status: "OK",
                    message: "the size is already"
                })
            }
            const createdSize = await Product.ProductSize.create({
                sizeName: sizeName
            })
            if (createdSize) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdSize
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const createProductDetails = (newProductDetails) => {
    return new Promise(async (resolve, reject) => {
        const {
            product,
            idProduct,
            power,
            size,
            color,
            voltage,
            standard,
            texture,
            secureLv,
            CRI,
            dimension,
            hole_dimension,
            chip_led,
            projection_angle,
            lumens_color_temperature,
            warranty,
            luminous_flux,
            unit_price,
            countInStock } = newProductDetails
        try {
            const checkProduct = await Product.Product.findOne({
                _id: product
            });

            if (!checkProduct) {
                reject({
                    status: "ERR",
                    message: "product details id is not defined"
                })
            }

            const checkProductDetails = await Product.ProductDetails.findOne({
                product: checkProduct._id,
                power: power ? power : null,
                size: size ? size : null,
                color: color ? color : null,
                idProduct,
                voltage,
                CRI,
                standard,
                texture,
                secureLv,
                dimension,
                lumens_color_temperature,
                warranty,
                luminous_flux,
                hole_dimension,
                chip_led,
                projection_angle

            })

            if (checkProductDetails !== null) {
                resolve({
                    status: "OK",
                    message: "the product details is already",
                })
            }

            let sale_price = Math.round(unit_price - (unit_price * checkProduct.sale_rate))

            const createdProductDetails = await Product.ProductDetails.create({
                product: checkProduct._id,
                power: power ? power : null,
                size: size ? size : null,
                color: color ? color : null,
                voltage,
                idProduct,
                CRI,
                dimension,
                standard,
                texture,
                secureLv,
                hole_dimension,
                lumens_color_temperature,
                warranty,
                luminous_flux,
                countInStock,
                unit_price,
                sale_price,
                chip_led,
                projection_angle,
                countInStock
            })

            if (createdProductDetails) {
                let price_update = {
                    min_price: sale_price,
                    max_price: sale_price,
                }
                if (sale_price > checkProduct.max_price || checkProduct.max_price === 0) {
                    price_update = {
                        min_price: checkProduct.min_price,
                        max_price: sale_price,
                    }
                    await Product.Product.findByIdAndUpdate(checkProduct._id, price_update, { new: true })
                }
                if (sale_price < checkProduct.min_price || checkProduct.min_price === 0) {
                    if (checkProduct.max_price === 0) {
                        price_update = {
                            min_price: sale_price,
                            max_price: sale_price,
                        }
                    } else {
                        price_update = {
                            min_price: sale_price,
                            max_price: checkProduct.max_price,
                        }
                    }
                    await Product.Product.findByIdAndUpdate(checkProduct._id, price_update, { new: true })
                }
                resolve({
                    status: "OK",
                    message: "CREATE PRODUCT SUCCESS",
                    data: createdProductDetails
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, product_type, protection_rating, collection, sale_rate, descriptions } = newProduct
        try {
            const checkName = await Product.Product.findOne({
                name: name
            })

            if (checkName !== null) {
                resolve({
                    status: "OK",
                    message: "the product name is already"
                })
            }
            const imgUrlArr = []
            await Promise.all(image?.map(async (item) => {
                const generateImgFileName = generateImageFileName();
                const imageUrl = await gcp.uploadToGCP(item, generateImgFileName);
                imgUrlArr.push(imageUrl);
            }));

            const createdProduct = await Product.Product.create({
                name, image: imgUrlArr, product_type, protection_rating, collection, sale_rate, descriptions
            })

            if (createdProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdProduct
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.Product.count()
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({ protection_rating: -1 }).populate('product_type')
                resolve({
                    status: "OK",
                    message: "GET ALL PRODUCT SORT SUCCESS",
                    data: allProductSort,
                    total: totalProduct,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            } else if (filter) {
                let filterConditions = {};
                if (filter.product_type) {
                    filterConditions.product_type = filter.product_type
                }
                if (filter.power) {
                    const productDetails = await Product.ProductDetails.find({ power: filter.power });
                    const productIds = productDetails.map(detail => detail.product);
                    filterConditions._id = { $in: productIds };
                }
                if (filter.collection) {
                    filterConditions["collection"] = filter.collection;
                }
                if (filter.color) {
                    const productDetails = await Product.ProductDetails.find({ color: filter.color });
                    const productIds = productDetails.map(detail => detail.product);
                    filterConditions._id = { $in: productIds };
                }
                if (filter.min_price && filter.max_price) {
                    filterConditions["$or"] = [
                        {
                            $and: [
                                { min_price: { $lte: filter.max_price } },
                                { max_price: { $gte: filter.min_price } }
                            ]
                        }
                    ];
                }

                const allProductFilter = await Product.Product.find(filterConditions).limit(limit).skip(page * limit).sort({ protection_rating: -1 }).populate('product_type')
                resolve({
                    status: "OK",
                    message: "GET ALL PRODUCT FILTER SUCCESS",
                    data: allProductFilter,
                    total: totalProduct,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.Product.find().limit(limit).skip(page * limit).sort({ protection_rating: -1 }).populate('product_type')
            resolve({
                status: "OK",
                message: "GET ALL PRODUCT SUCCESS",
                data: allProduct,
                total: totalProduct,
                currentPage: (page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getProductDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const productDetails = await Product.ProductDetails.find({
                product: id
            }).populate('size').populate('power').populate('color').populate('product').populate({
                path: 'product',
                populate: {
                    path: 'product_type',
                    model: 'ProductType'
                }
            })
            resolve({
                status: "OK",
                message: "GET PRODUCT DETAILS SUCCESS",
                data: productDetails
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.Product.findOne({
                _id: id
            })
            resolve({
                status: "OK",
                message: "GET PRODUCT BY ID SUCCESS",
                data: product
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getProductByType = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await Product.Product.find({
                product_type: id
            }).limit(5)
            resolve({
                status: "OK",
                message: "GET PRODUCT BY ID SUCCESS",
                data: products
            })
        } catch (error) {
            console.log(error);
        }
    })
}
const getAllProductType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProductType = await Product.ProductType.find();
            resolve({
                status: "OK",
                message: "GET PRODUCT TYPES SUCCESS",
                data: allProductType
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getRandomProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const randomProducts = await Product.Product.aggregate([{ $sample: { size: 5 } }]);

            resolve({
                status: "OK",
                message: "GET PRODUCTS RANDOM SUCCESS",
                data: randomProducts
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined"
                })
            }
            if (data.image[0]) {
                const imgUrlArr = []
                await Promise.all(data.image?.map(async (item) => {
                    if (Buffer.from(item, 'base64').toString('base64') !== item) {
                        const generateImgFileName = generateImageFileName();
                        const imageUrl = await gcp.uploadToGCP(item, generateImgFileName);
                        imgUrlArr.push(imageUrl);
                    }
                }));
                data.image = imgUrlArr
            } else if (data.image[0] == "") {
                data.image = undefined;
            } else {
                data.image = undefined;
            }
            if (data.product_type) {
                const productType = await Product.ProductType.findOne({ typeName: data.product_type })
                if (productType)
                    data.product_type = productType._id;
                else resolve({
                    status: "ERR",
                    message: "INVALID PRODUCT TYPE",
                })
            }
            const updatedProduct = await Product.Product.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedProduct
            })
        } catch (error) {
            console.log(error);
        }
    })
}


const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined"
                })
            }

            await Product.Product.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "DELETE PRODUCT SUCCESS"
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const updateProductDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProductDetails = await Product.ProductDetails.findOne({
                _id: id
            }).populate('product');

            if (checkProductDetails === null) {
                resolve({
                    status: "OK",
                    message: "The product details is not defined"
                })
            }
            const new_sale_price = data.unit_price - (checkProductDetails.product.sale_rate * data.unit_price);
            if (data.unit_price) {
                data.sale_price = new_sale_price
            }
            const updatedProductDetails = await Product.ProductDetails.findByIdAndUpdate(id, data, { new: true })
            if (updatedProductDetails) {
                // xử lí product min price, max price
                if (data.unit_price) {
                    let price_update = {
                        min_price: checkProductDetails.product.min_price,
                        max_price: checkProductDetails.product.max_price,
                    }
                    if (new_sale_price > checkProductDetails.product.max_price) {
                        price_update.max_price = new_sale_price
                        if (price_update.min_price === checkProductDetails.sale_price) {
                            const minPriceDetails = await Product.ProductDetails.aggregate([
                                { $match: { product: checkProductDetails.product._id } }, // Lọc các sản phẩm cùng product
                                { $group: { _id: null, minPrice: { $min: "$sale_price" } } }, // Tìm min
                            ]).exec();
                            const minPrice = minPriceDetails.length ? minPriceDetails[0].minPrice : null;
                            price_update.min_price = minPrice
                        }
                        await Product.Product.findByIdAndUpdate(checkProductDetails.product._id, price_update, { new: true })
                    } else if (new_sale_price < checkProductDetails.product.min_price) {
                        price_update.min_price = new_sale_price
                        if (price_update.max_price === checkProductDetails.sale_price) {
                            const maxPriceDetails = await Product.ProductDetails.aggregate([
                                { $match: { product: checkProductDetails.product._id } }, // Lọc các sản phẩm cùng product
                                { $group: { _id: null, maxPrice: { $max: "$sale_price" } } }, // Tìm max
                            ]).exec();
                            const maxPrice = maxPriceDetails.length ? maxPriceDetails[0].maxPrice : null;
                            price_update.max_price = maxPrice
                        }
                        await Product.Product.findByIdAndUpdate(checkProductDetails.product._id, price_update, { new: true })
                    } else {
                        const minPriceDetails = await Product.ProductDetails.aggregate([
                            { $match: { product: checkProductDetails.product._id } }, // Lọc các sản phẩm cùng product
                            { $group: { _id: null, minPrice: { $min: "$sale_price" } } }, // Tìm min
                        ]).exec();
                        const minPrice = minPriceDetails.length ? minPriceDetails[0].minPrice : null;
                        price_update.min_price = minPrice
                        const maxPriceDetails = await Product.ProductDetails.aggregate([
                            { $match: { product: checkProductDetails.product._id } }, // Lọc các sản phẩm cùng product
                            { $group: { _id: null, maxPrice: { $max: "$sale_price" } } }, // Tìm max
                        ]).exec();
                        const maxPrice = maxPriceDetails.length ? maxPriceDetails[0].maxPrice : null;
                        price_update.max_price = maxPrice
                        await Product.Product.findByIdAndUpdate(checkProductDetails.product._id, price_update, { new: true })
                    }
                }
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: updatedProductDetails
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const deleteProductDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProductDetails = await Product.ProductDetails.findOne({
                _id: id
            })
            if (checkProductDetails === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined"
                })
            }

            await Product.ProductDetails.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "DELETE PRODUCT DETAILS SUCCESS"
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getProductRefProps = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const colors = await Product.ProductColor.find()
            const sizes = await Product.ProductSize.find()
            const collections = await Collection.find()
            const powers = await Product.ProductPower.find()
            powers.sort((a, b) => {
                const wattA = parseInt(a.powerValue);
                const wattB = parseInt(b.powerValue);
                return wattA - wattB;
            })
            const data = {
                colors: colors,
                sizes: sizes,
                collections: collections,
                powers: powers
            }
            resolve({
                status: "OK",
                message: "GET PROPS SUCCESS",
                data: data
            })
        } catch (error) {
            console.log(error);
        }
    })
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
    getAllProductType,
    getProduct,
    createProductType,
    getProductRefProps,
    getProductByType,
    getRandomProduct
}