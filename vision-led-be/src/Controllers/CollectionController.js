const CollectionServices = require('../Services/CollectionServices')

const getCollections = async (req, res) => {
    try {

        const response = await CollectionServices.getCollections();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getCollection = async (req, res) => {
    try {
        const collectionID = req.params.id
        if (!collectionID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CollectionServices.getCollection(collectionID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createCollection = async (req, res) => {
    try {
        const { name, description, image } = req.body
        if (!name || !description || !image) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CollectionServices.createCollection(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateCollection = async (req, res) => {
    try {
        const collectionID = req.params.id
        const updateData = req.body
        if (!collectionID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CollectionServices.updateCollection(collectionID, updateData);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteCollection = async (req, res) => {
    try {
        const collectionID = req.params.id
        if (!collectionID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CollectionServices.deleteCollection(collectionID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    getCollection,
    getCollections,
    createCollection,
    updateCollection,
    deleteCollection
}