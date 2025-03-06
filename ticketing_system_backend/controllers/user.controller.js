const User = require("../models/user.model");
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roleId", "name")
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  console.log("call");
  try {
    const { id } = req.params;
    const user = await User.findById(id)
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = {
      ...user._doc,
    };
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get user By uid
const getUserByUid = async (req, res) => {
  const { uid } = req.query;
  if (!uid) {
    return res.status(400).json({ error: "User ID (uid) is required" });
  }
  try {
    const user = await User.findOne({ uid })
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = {
      ...user._doc,
    };

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUserDetails = async (req, res) => {
  console.log("called");
  const { userId, firstName, middleName, lastName} = req.body;
  console.log("data", req.body);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    Object.assign(user, {
      firstName,
      middleName,
      lastName,
    });

    await user.save();
    const responseUser = {
      ...user._doc,
    };
    res.status(200).json({ 
      message: "User details updated successfully", 
      user: responseUser 
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: error.message });
  }
};
// 
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    await User.findByIdAndDelete(id, req.body);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getUsers,
  getUserById,
  getUserByUid,
  updateUserDetails,
  deleteUser,
  updateUser,
};
