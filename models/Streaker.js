import { timeStamp } from "console";
import mongoose, { models, Schema } from "mongoose";

const StreakerSchema = new mongoose.Schema(
  {
    streakname: {
      type: String,
    },
    maxdays: {
      type: String,
    },
    started: {
      type: Boolean,
      default: false,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  timeStamp
);

const Streaker = models.Streaker || mongoose.model("Streaker", StreakerSchema);

export default Streaker;
