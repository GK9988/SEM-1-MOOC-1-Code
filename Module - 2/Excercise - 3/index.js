import Mongoose from "mongoose";
import Dishes from "./models/dishes.js";

const url = "mongodb://localhost:27017/conFusion";

const connect = Mongoose.connect(url);

connect.then((db) => {
  console.log("Connected to the database");

  var newDish = Dishes({
    name: "Rajma Rice",
    description: "My favourite Dish",
  });

  newDish
    .save()
    .then((dish) => {
      console.log(dish);

      return Dishes.find({}).exec();
    })
    .then((dishes) => {
      console.log(dishes);

      return Dishes.remove({});
    })
    .then(() => {
      return Mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
