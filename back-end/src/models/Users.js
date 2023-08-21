const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, minLength: 1, maxLength: 50 },
    hash: { type: String, require: true },
    isActive: { type: Boolean, default: false },
    name: { type: String, required: true, minLength: 1, maxLength: 50 },
    created_at: { type: Date, default: Date.now },
    isStaff: { type: Boolean, default: false },
    staffId: { type: String, required: false, minLength: 1, maxLength: 50 },
    staffRank: { type: String, required: false },
    isMember: { type: Boolean, default: false },
    memberId: { type: String, required: false, minLength: 1, maxLength: 50 },
    memberRank: { type: String, require: false },
    barTabActive: { type: Boolean, default: false },
  },
  { collection: "users" }
);

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
