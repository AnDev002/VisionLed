const compression = require('compression');

function applyCompression(req, res, next) {
    compression()(req, res, next);
}

module.exports = applyCompression;