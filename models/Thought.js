const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// Reaction subdocument schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: function () {
      return new Types.ObjectId();
    },
  },
  reactionBody: {
    type: String,
    required: true,
    max_length: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timeStamp) => moment(timeStamp).format("MM DD, YYYY [at] hh:mm a"),
  },
});

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => moment(timeStamp).format("MM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    // Array of nested documents created with the reactionSchema (replies)
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      // getters includes virtuals
      getters: true,
    },
  }
);

// Create a virtual property `reactionCount` that gets the thought's reaction per user
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;