const { User, Thought } = require("../models");

// Aggregate function to get the number of Users overall
const allUsers = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

// Handles userRoutes
module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." })
          : res.json({
              user,
              allUsers: await allUsers(),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." })
          : res.json({ user: "User successfully updated! 🎉" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete user by id (cascade thoughts)
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "User deleted! No thoughts 💭 to delete." })
          : res.json({
              message: "User and their thoughts successfully deleted! 🧠🎉",
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add friend by userId
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({
              message: "No friend with that ID found! Please try again.",
            })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete friend by userId
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." })
          : res.json({ user: "Friend successfully removed 🎉" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};