import mongoose, { Document, Model } from "mongoose";
import { Role, User, UserStatus } from "../misc/types";

const Sequence = require('./schemas/sequenceSchema');
const Schema = mongoose.Schema;

export type UserDocument = Document & User;

const UserSchema = new Schema({
  numericId: { type: Number, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  resetToken: { type: String, default: null },
  resetTokenExpiresAt: { type: String, default: null },
  role: { type: String, required: true, enum: [Role.ADMIN, Role.CUSTOMER], default: Role.CUSTOMER },
  status: { type: String, required: true, enum: [UserStatus.ACTIVE, UserStatus.INACTIVE], default: UserStatus.ACTIVE }
  // orders: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Orders",
  //   },
  // ],
});

UserSchema.pre('save', async function (next) {
  if (!this.isNew) {
      return next();
  }
  try {
      const sequence = await Sequence.findOneAndUpdate(
          { name: 'usersNumericId' },
          { $inc: { value: 1 } },
          { upsert: true, new: true }
      );

      this.numericId = sequence.value;
      next();
  } catch (error: any) {
      next(error);
  }
});

export default mongoose.model<UserDocument>("User", UserSchema);
