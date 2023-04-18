

const db = require("../config/connection");
const {Comment} = require("../models");
const commentSeeds = require("./commentSeeds.json");


db.once("open", async () => {
  try {
    await Comment.deleteMany({});

    await Comment.create(commentSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("The database seed process has been completed.");
  process.exit(0);
});

