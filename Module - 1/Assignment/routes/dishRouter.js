import Express from "express";
import bodyParser from "body-parser";

const dishRouter = Express.Router();
dishRouter.use(bodyParser.json());

dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    res.end("Will send all the dishes to you!");
  })

  .post((req, res, next) => {
    res.end(
      `Will add the dish:  ${req.body.name} with details: ${req.body.description}`
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })

  .delete((req, res, next) => {
    res.end("Deleting all the dishes!");
  });

dishRouter
  .route("/:dishId")
  .get((req, res, next) => {
    res.end(`Will Send you the dish with id: ${req.params.dishId}`);
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
  })

  .put((req, res, next) => {
    res.write(`Updating the dish: ${req.params.dishId} \n`);
    res.end(
      `Will update the dish: ${req.body.name} with details: ${req.body.description}`
    );
  })

  .delete((req, res, next) => {
    res.end(`Deleting the Dish: ${req.params.dishId}`);
  });

export default dishRouter;
