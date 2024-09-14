const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true, default: "" },
});

const projectDetailsSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
  image: { type: String, required: false },
  description: { type: String, required: false },
});

const Project = mongoose.model("Project", projectSchema);
const ProjectDetails = mongoose.model("ProjectDetails", projectDetailsSchema);

module.exports = {
  Project,
  ProjectDetails,
};
