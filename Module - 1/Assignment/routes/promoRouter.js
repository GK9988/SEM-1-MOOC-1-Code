import Express from "express";
import bodyParser from "body-parser";

const promoRouter = Express.Router();
promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    res.end("Will send all the promotions to you!");
  })

  .post((req, res, next) => {
    res.end(
      `Will add the promotion:  ${req.body.name} with details: ${req.body.description}`
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })

  .delete((req, res, next) => {
    res.end("Deleting all the promotions!");
  });

promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    res.end(`Will Send you the promotion with id: ${req.params.promoId}`);
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotion/${req.params.promoId}`);
  })

  .put((req, res, next) => {
    res.write(`Updating the promotion: ${req.params.promoId} \n`);
    res.end(
      `Will update the promotion: ${req.body.name} with details: ${req.body.description}`
    );
  })

  .delete((req, res, next) => {
    res.end(`Deleting the promotion: ${req.params.promoId}`);
  });

export default promoRouter;
