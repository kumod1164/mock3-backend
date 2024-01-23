const mongoose = require("mongoose");
require("dotenv").config();

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true }, 
  specialization: {
    type: String,
    required: true,
    enum: ["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"],
  },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  slots: { type: Number, required: true },
  fee: { type: Number, required: true },
});

const EmployeeModel = mongoose.model("doctor", doctorSchema);

module.exports = { EmployeeModel };
