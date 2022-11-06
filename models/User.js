const { Schema, model } = require("mongoose");
const models = require("../models");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address!",
      ],
    },
    // Array of _id values referencing the Thought model
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    // Array of _id values referencing the User model (self-reference)
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
