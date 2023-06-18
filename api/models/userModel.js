const mongoose = require("mongoose");
const Schema = new mongoose.Schema;

let UserSchema = new Schema(
  {
    "name": String,
  }
)

module.exports = mongoose.model("User", UserSchema); // робить доступним для підключення у інших файлах 