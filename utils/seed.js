const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { usernames, email, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing Users
  await User.deleteMany({});
  // Drop existing Thoughts
  await Thought.deleteMany({});

  console.log(
    "================DROPPED EXISTING USERS & THOUGHTS================"
  );

  // Create empty array to hold Users, Thoughts
  const users = [];
  const userThoughts = [];

  // Loop through User, Thought Data
  for (let i = 0; i < usernames.length; i++) {
    const userObj = {
      username: usernames[i],
      email: email[i],
    };
    const newUser = await User.create(userObj);
    users.push({
      _id: newUser._id.toString(),
      username: newUser.username,
    });
  }

  for (let i = 0; i < thoughts.length; i++) {
    const thoughtsObj = {
      username: usernames[i],
      thoughtText: thoughts[i],
    };
    const newThought = await Thought.create(thoughtsObj);
    userThoughts.push({
      _id: newThought._id.toString(),
      username: newThought.username,
    });
  }

  // Attach seeded User Data to seeded Thought Data
  for (let i = 0; i < userThoughts.length; i++) {
    const userId = users.filter(
      (user) => user.username === userThoughts[i].username
    );
    console.log("USER ID", userId);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId[0]._id },
      { $push: { thoughts: userThoughts[i]._id } },
      { new: true }
    );
    console.log(updatedUser);
  }

  console.info("================USERS & THEIR THOUGHTS SEEDED================");

  process.exit(0);
});