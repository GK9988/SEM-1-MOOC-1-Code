// module imports
import Mongo from "mongodb";
import assert from "assert";

// app Config
const MongoClient = Mongo.MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "conFusion";

// DB Connection

MongoClient.connect(dbUrl, (err, client) => {
  assert.equal(err, null);
  console.log("Connected correctly to the server");

  const db = client.db(dbName);

  const collection = db.collection("dishes");

  collection.insertOne(
    {
      name: "Ayush Srivastava",
      description: "He is RAW Venom / ADF / DAT0R Naurto",
    },
    (err, result) => {
      assert.equal(err, null);

      console.log("After Insert: \n");
      console.log(result.acknowledged);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);

        console.log("Found: \n");
        console.log(docs);

        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);

          client.close();
        });
      });
    }
  );
});
