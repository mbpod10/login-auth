const mongoose = require("../dbs/connection");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
