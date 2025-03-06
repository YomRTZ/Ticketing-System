const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
uid: { type: String, required: true, unique: true },
firstName: { type: String  },
middleName: { type: String },
lastName: { type: String},
email: { type: String },
// profilePicture: { type:String },
roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});
module.exports = mongoose.model("User", UserSchema);