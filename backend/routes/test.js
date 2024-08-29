import { getAllReviews } from "../Controllers/reviewController.js";
import express from "express";
const router = express.Router({ mergeParams: true });

router
  .route("/") // Use route() instead of chaining get() and post()
  .get(getAllReviews);

export default router;
