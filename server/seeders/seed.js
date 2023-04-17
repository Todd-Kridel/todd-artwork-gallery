

const db = require("../config/connection");
const {User, Artwork} = require("../models");
const userSeeds = require("./userSeeds.json");
const artworkSeeds = require("./artworkSeeds.json");


db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Artwork.deleteMany({});

    await User.create(userSeeds);
    await Artwork.create(artworkSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("The database seed process has been completed.");
  process.exit(0);
});

