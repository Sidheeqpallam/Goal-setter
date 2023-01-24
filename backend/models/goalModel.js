const mongoose = require("mongoose");
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      require: [true, "Please add the text."],
    },
  },
  {
    timestamps: trueconst,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
