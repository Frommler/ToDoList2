"use strict";
module.exports = function (app) {
  var todoList = require("../controllers/todoListController");

  // todoList Routes
  app
    .route("/tasks")
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  app
    .route("/upd-all-notes")
    .put(todoList.upd_all_notes);

  app
    .route("/tasks/:taskId")
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app
    .route("/sort")
    .get(todoList.sort_by_date);

  app
    .route("/get-by-year/:year")
    .get(todoList.get_by_year)
    .put(todoList.upd_status_by_year);

  app
    .route("/get-by-date/:date")
    .get(todoList.get_by_date);    

  app
    .route("/notes/:param/:newtext")
    .get(todoList.get_note_by_param)
    .put(todoList.update_note_by_param);

  app
    .route("/get-task-by-param/:param")
    .get(todoList.get_task_by_param);
};
