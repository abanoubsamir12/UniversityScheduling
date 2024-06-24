const ModelUser = require("../models/user.model.js");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await ModelUser.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User Doesn't Exist!" });
  }

  if (!password) {
    return res.json({ message: "Username or Password Is Incorrect!" });
  }

  res.status(200).json("success");
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await ModelUser.findOne({ email });
  if (user) {
    return res.status(404).json({ message: "User already Exist!" });
  }

  const newUser = ModelUser({ email, password });
  await newUser.save();

  res.status(200).json("success");
};

module.exports= {
  login,
  register,
};
