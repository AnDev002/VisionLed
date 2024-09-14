const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const ProjectRouter = require('./ProjectRouter')
const OrderRouter = require('./OrderRouter')
const CollectionRouter = require('./CollectionRouter')
const GoogleAuthRouter = require('./googleAuth')
const FacebookAuthRouter = require('./facebookAuth')

//require("./../passport");

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/project', ProjectRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/collection', CollectionRouter)
    app.use('/api/auth', GoogleAuthRouter)
    app.use('/api/auth', FacebookAuthRouter)
}

module.exports = routes