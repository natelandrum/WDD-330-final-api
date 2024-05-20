env = require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URL;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.warn("Trying to init DB again!");
    return callback(null, _db);
  }
  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialzed!");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
