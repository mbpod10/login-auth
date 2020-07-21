const mongoose = require("../dbs/connection");
const bycrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bycrypt.hash(this.password, 10, (error, passwordHash) => {
    if (error) {
      return next(error);
    }
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bycrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return cb(error);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
