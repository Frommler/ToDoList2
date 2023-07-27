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

exports.get_by_date = async function (req, res) {
  let dateParam = req.params.date;
  let tasks = await Task.aggregate([
    {
      $addFields: {
        justDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$Created_date" },
        },
      },
    },
    {
      $match: { justDate: dateParam },
    },
  ]);
  res.json(tasks);
};

exports.sort_by_date = async function (req, res) {
  let task = await Task.find().sort({ Created_date: 1 });
  res.json(task);
};

exports.get_by_year = async function (req, res) {
  let yearParam = parseInt(req.params.year);
  let tasks = await Task.aggregate([
    {
      $addFields: {
        justYear: { $year: "$Created_date" },
      },
    },
    {
      $match: {
        justYear: yearParam,
      },
    },
  ]);
  res.json(tasks);
};

//TODO update + aggregation ?

exports.upd_status_by_year = async function (req, res) {
  let yearParam = parseInt(req.params.year);
  let task = await Task.updateMany(
    {
      $expr: { $eq: [{ $year: "$Created_date" }, yearParam] },
    },
    {
      status: "pending",
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
  let param = req.params.param;
  let tasks = await Task.find({ Note: { $regex: param, $options: "i" } });
  res.json(tasks);
};

exports.update_note_by_param = async function (req, res) {
  let param = req.params.param;
  let newtext = req.params.newtext;
  console.log("text ", newtext);
  let tasks = await Task.updateMany(
    {
      Note: { $regex: param, $options: "i" },
    },
    {
      Note: newtext,
    }
  );
  res.json(tasks); //Task
};

exports.get_count_of_docs = async function (req, res) {
  let nameParam = req.params.name;
  const countOfTasks = await Task.countDocuments({
    name: { $regex: nameParam, $options: "i" },
  });
  res.json(countOfTasks);
};

//TODO change status to date

exports.get_count_task_by_date = async function (req, res) {
  const tasks = await Task.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y/%m/%d", date: "$Created_date" } },
        countTasks: {
          $count: {},
        },
      },
    },
  ]);
  res.json(tasks); //Task
};

exports.get_task_by_month = async function (req, res) {
  let monthParam = parseInt(req.params.month);
  const tasks = await Task.aggregate([
    {
      $addFields: {
        justMonth: {
          $month: "$Created_date",
        },
      },
    },
    {
      $match: {
        justMonth: monthParam,
      },
    },
  ]);
  res.json(tasks); //Task
};

exports.aggregate_add_field = async function (req, res) {
  let tasks = await Task.aggregate([
    {
      $addFields: {
        year: { $year: "$Created_date" },
      },
    },
  ]);
  res.json(tasks);
};

//TODO HW3 1) find all tasks by specified month 2) find all tasks by month and by name at one time (use two params https://stackoverflow.com/questions/15128849/using-multiple-parameters-in-url-in-express) --- 12.07.2023
