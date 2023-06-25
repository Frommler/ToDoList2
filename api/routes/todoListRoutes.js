"use strict";
module.exports = function (app) {
  var todoList = require("../controllers/todoListController");

  // todoList Routes
  app.route("/tasks").get(todoList.list_all_tasks).post(todoList.create_a_task);

  app
    .route("/tasks/:taskId")
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.route("/sort").get(todoList.sort_by_date);

  app
    .route("/get/:year")
    .get(todoList.get_by_year)
    .put(todoList.upd_status_by_year);
    
  app.route("/get-task-by-param/:param").get(todoList.get_by_param);
};
