const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  description: { type: String, required: false },
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
