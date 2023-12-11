const User = require("../models/user.js");

async function HandleGetAllUsers(req, res) {
  const allDbusers = await User.find({});
  return res.json(allDbusers);
}

async function HandleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function HandleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });
  return res.json({ status: "Successfully updated " });
}

async function HandleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "succssfully deleted" });
}

async function HandleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "Please provide all the fields" });
  }
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  return res.status(201).json({ msg: "success" });
}

module.exports = {
  HandleGetAllUsers,
  HandleGetUserById,
  HandleUpdateUserById,
  HandleDeleteUserById,
  HandleCreateUser
};
