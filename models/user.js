const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      job_title: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
      },
    },
    { timestamps: true }
  );


//creating a model
const User = mongoose.model("user", userSchema);

module.exports=User;