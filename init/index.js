require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;
console.log("DB URL:", dbUrl);

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB Atlas");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map(obj => ({
    ...obj,
    owner: "691ca68fb1a014094159c496"
  }));
  await Listing.insertMany(initData.data);
  console.log("Data initialized");
};

main()
  .then(initDB)
  .catch(err => console.log(err));