import Mongoose from "mongoose";
import Dishes from "./models/dishes.js";

const url = "mongodb://localhost:27017/conFusion";

const connect = Mongoose.connect(url);

connect.then((db) => {
  console.log("Connected to the database");

  Dishes.create({
    name: "Rajma Rice",
    description: "My favourite Dish",
  })

    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(dish._id, {
        $set: {
          description: "My favourite dish updated",
        },
        new: true,
      }).exec();
    })
    .then((dish) => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: "My favourite dish ",
        author: "Garv Khurana",
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.remove({});
    })
    .then(() => {
      return Mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
