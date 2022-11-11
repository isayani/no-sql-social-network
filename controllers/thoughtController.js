const { User, Thought } = require("../models");

// Handles thoughtRoutes
module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought not found! Please try again." })
          : res.json({
              thoughts,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Error: thought was not recorded!" })
          : User.findOneAndUpdate(
              { userId: req.body.userId },
              { $push: { thoughts: { thought: thought.thoughtText } } },
              { runValidators: true, new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." })
          : res.json({ thought: "Thought successfully created! 💭🎉" })
      )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // Update Thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { thoughtText: req.body.thoughtText, username: req.body.username },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought not found! Please try again." })
          : res.json({ thought: "Thought successfully updated! 💭🎉" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete Thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ thoughtId: req.params.thoughtId })
      .then(() => res.json({ message: "thought deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  // Add reaction by thoughtId
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $addToSet: { reactions: { reactionId: req.body } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "No thought with that ID found! Please try again.",
            })
          : res.json({ thought: "Reaction successfully added! 🎉" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete reaction by thoughtId
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought not found! Please try again." })
          : res.json({ thought: "Reaction successfully removed! 🎉" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};