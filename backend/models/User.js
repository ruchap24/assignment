const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: function (v) {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid email address!`,
    // },
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     // Validate password to have at least one lowercase, one uppercase, one number, and minimum 8 characters
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v);
    //   },
    //   message: (props) =>
    //     "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.",
    // },
  },
});

UserSchema.pre("save", async function (next) {
  const person = this;
  // hash password only if it has been modified
  if (!person.isModified("password")) {
    return next();
  }
  try {
    // generate hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzRiNGFkN2E5YzNhMDAyYTM5M2Y4ZiIsImVtYWlsIjoiY0BnbWFpbC5jb20iLCJpYXQiOjE3MjQxNjczNzZ9.84KK3LoRbsw3qy2reoLx9GlV6RY92UTlv5xM8a7C3w4