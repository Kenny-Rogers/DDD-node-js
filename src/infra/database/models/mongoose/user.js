import mongoose from "mongoose";

import UserClass from "../../../../domain/user";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      select: true
    },
    encodedPassword: {
      type: String,
      required: true,
      select: false
    },
    username: {
      type: String,
      unique: true
    },
    lastlogin: {
      type: Date,
      default: null
    },
    roles: {
      type: [String],
      default: ["USER"]
    }
  },
  { timestamps: true }
);

//Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ roles: 1 });

//loads the user entity methods in the model
UserSchema.loadClass(UserClass);

export default mongoose.model("User", UserSchema);
