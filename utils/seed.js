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

  console.log("================Collections Emptied================");

  // Create empty array to hold Users, Thoughts
  const users = [];
  const userThoughts = [];
  // Loop through User, Thought Data
  function userData() {
    for (let i = 0; i < usernames.length; i++) {
      const userObj = {
        username: usernames[i],
        email: email[i],
      };
      users.push(userObj);
    }
  }
  userData();

  function thoughtData() {
    for (let i = 0; i < thoughts.length; i++) {
      const thoughtsObj = {
        username: usernames[i],
        thoughtText: thoughts[i],
      };
      userThoughts.push(thoughtsObj);
    }
  }
  thoughtData();

  // Insert Many for userData
  await User.insertMany(users);
  console.table(users);
  console.info("================Users Seeded================");

  // Insert Many for thoughtData
  await Thought.insertMany(userThoughts);
  console.table(userThoughts);
  console.info("================Thoughts Seeded================");

  process.exit(0);
});
