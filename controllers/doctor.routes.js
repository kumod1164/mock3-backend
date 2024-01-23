const express = require("express");
const { DoctorModel } = require("../models/doctor.model");
const doctorController = express.Router();

doctorController.get("/", async (req, res) => { 

  let query = {};

  // Filtering option
  if (req.query.department) {
    query.department = req.query.department;
  }

  // Sorting logic
  const sortOptions = {};
  if (req.query.sort) {
    sortOptions[req.query.sort] = req.query.order === "desc" ? -1 : 1;
  }

  // Searching logic
  if (req.query.firstName) {
    query.firstName = { $regex: new RegExp(req.query.firstName, "i") };
  }

  const data = await DoctorModel.find(query)
    .sort(sortOptions)

  res.json({
    data
  });
});

doctorController.post("/add", async (req, res) => {
  const dataAdded = await DoctorModel.create(req.body);

  if (dataAdded) {
    res.json({ message: "Data Added" });
  } else {
    res.status(400).json({ message: "something went wrong" });
  }
});

doctorController.patch("/update/:id", async (req, res) => {
  const id = req.params.id;

  const dataAdded = await DoctorModel.findOneAndUpdate({ _id: id }, req.body);

  res.json({ message: "Data updated!" });
});
doctorController.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;

  const dataAdded = await DoctorModel.findOneAndDelete({ _id: id });

  res.json({ message: "Data deleted!" });
});

module.exports = { doctorController };
