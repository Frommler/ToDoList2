"use strict";

var mongoose = require("mongoose"),
  Task = mongoose.model("Tasks");

exports.list_all_tasks = async function (req, res) {
  let task = await Task.find({});
  res.json(task);
};

exports.create_a_task = async function (req, res) {
  var new_task = new Task(req.body);
  let task = await new_task.save();
  res.json(task);
};

exports.read_a_task = async function (req, res) {
  let task = await Task.findById(req.params.taskId);
  res.json(task);
};

exports.update_a_task = async function (req, res) {
  let task = await Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, {
    new: true,
  });
  res.json(task);
};

exports.delete_a_task = function (req, res) {
  const removedTask = Task.deleteOne({
    _id: req.params.taskId,
  });
  res.json({ message: "Task successfully deleted " + removedTask });
};

exports.read_a_date = function (req, res) {
  let task = Task.find({ Created_date: req.params.date });
  res.json(task);
};
