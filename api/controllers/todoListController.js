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

exports.sort_by_date = async function (req, res) {
  let task = await Task.find().sort({ Created_date: 1 });
  res.json(task);
};

exports.get_by_year = async function (req, res) {
  let year = req.params.year;
  let startDate = new Date(year, 0, 1);
  let endDate = new Date(year, 11, 31);
  let task = await Task.find({
    Created_date: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  res.json(task);
};

exports.upd_status_by_year = async function (req, res) {
  let year = req.params.year;
  let startDate = new Date(year, 0, 1);
  let endDate = new Date(year, 11, 31);
  let task = await Task.updateMany(
    {
      Created_date: {
        $gte: startDate,
        $lte: endDate,
      },
    },
    {
      status: "ongoing",
    }
  );
  res.json(task);
};

exports.get_task_by_param = async function (req, res) {
  let param = req.params.param;
  let task = await Task.find({ name: { $regex: param, $options: "i" } });
  res.json(task);
};

exports.upd_all_notes = async function (req, res) {
  await Task.updateMany({ Note: "empty note" });
  res.json({ message: "Update was success" });
};

exports.get_note_by_param = async function (req, res) {
  let param2 = req.params.param;
/*   let tasks = await Task.find({ Note: { $regex: param, $options: "i" } });
  res.json(tasks); Olya */
  Task.find({ Note: { $regex: param2, $options: "i" } })
  .then((tasks) =>
    res.json(tasks)
  );
};

exports.update_note_by_param = async function (req, res) {
  let param = req.params.param;
  let newtext = req.params.newtext;
  console.log("text ", newtext);
  let tasks = await Task.updateMany(
    { 
      Note: { $regex: param, $options: "i" } 
    },
    {
      Note: newtext
    }
    );
  res.json(tasks);
};
