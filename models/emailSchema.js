import mongoose from "mongoose";

const emailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("emails", emailSchema);
