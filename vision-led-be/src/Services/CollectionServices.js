const Collection = require("../Models/Collection")
const generateImageFileName = require("../Ults/GenerateImageFileName")
const gcp = require("./GoogleCloudService")
const getCollections = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const collections = await Collection.find()
            resolve({
                status: "OK",
                message: "GET COLLECTIONS SUCCESS",
                data: collections
            })
        } catch (error) {
            console.log(error);
        }
    })
}
const getCollection = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const collection = await Collection.findOne({
                _id: id
            })
            if (collection) {
                resolve({
                    status: "OK",
                    message: "GET COLLECTIONS SUCCESS",
                    data: collection
                })
            }
            resolve({
                status: "OK",
                message: "GET COLLECTIONS FAILED",
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const createCollection = (newCollection) => {
    return new Promise(async (resolve, reject) => {
        const { name, description, image } = newCollection
        try {
            const generateImgFileName = generateImageFileName()
           
            const imageUrl = await gcp.uploadToGCP(image, generateImgFileName);
         
            const createdCollection = await Collection.create({
                name, image: imageUrl, description
            })

            if (createdCollection) {
                resolve({
                    status: "OK",
                    message: "CREATE COLLECTION SUCCESS",
                    data: createdCollection
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const updateCollection = (id, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCollection = Collection.findOne({
                _id: id
            })

            if (checkCollection === null) {
                resolve({
                    status: "ERR",
                    message: "the collection id is not defined"
                })
            }

            const updatedCollection = await Collection.findByIdAndUpdate(id, updateData, { new: true })

            resolve({
                status: "OK",
                message: "UPDATE COLLECTION SUCCESS",
                data: updatedCollection
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const deleteCollection = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCollection = Collection.findOne({
                _id: id
            })

            if (checkCollection === null) {
                resolve({
                    status: "ERR",
                    message: "the collection id is not defined"
                })
            }

            await Collection.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "DELETE COLLECTION SUCCESS"
            })
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = {
    getCollection,
    getCollections,
    createCollection,
    updateCollection,
    deleteCollection
}