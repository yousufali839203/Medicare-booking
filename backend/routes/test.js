import { getAllReviews } from "../Controllers/reviewController.js";
import express from "express";
const router = express.Router({ mergeParams: true });

router
  .route("/") // Use route() instead of chaining get() and post()
  .get((req, res) => {
    res.send("Hello World");
  });

export default router;
