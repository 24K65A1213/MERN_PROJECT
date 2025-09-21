//src/config/db.js
const { MongoClient } = require("mongodb");

let db;     // cache the DB instance
let client; // cache the client

async function connectDB() {
  if (db) {
    return db; // reuse existing connection
  }

  try {
    const uri = "mongodb://localhost:27017";
      const dbName = "resultsDB";

    if (!uri || !dbName) {
      throw new Error("DB_URL and DB_NAME must be set in .env");
    }

    client = new MongoClient(uri);

    await client.connect();
    db = client.db(dbName);

    console.log(`MongoDB connected: ${dbName}`);
    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // crash if DB connection fails
  }
}

// Clean shutdown (important in dev/test)
process.on("SIGINT", async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  }
});
module.exports = connectDB;
