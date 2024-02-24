import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});
reviewSchema.statics.calcAverageRating = async function (doctorId) {
  try {
    const stats = await this.aggregate([
      { $match: { doctor: doctorId } },
      {
        $group: {
          _id: "$doctor",
          numOfRating: { $sum: 1 },
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (stats.length > 0) {
      await Doctor.findByIdAndUpdate(doctorId, {
        totalRating: stats[0].numOfRating,
        averageRating: stats[0].averageRating,
      });
    }
  } catch (error) {
    console.error(error);
    // Handle error appropriately
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRating(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
