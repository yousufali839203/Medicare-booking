import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "./../auth/verifyToken.js";

const router = express.Router({ mergeParams: true }); // Corrected the syntax

router
  .route("/") // Use route() instead of chaining get() and post()
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);

export default router;
