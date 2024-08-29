import express from "express";
import cookieParser from "cookie-parser";
import reviewRoute from "./routes/review.js";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import authRoute from "./routes/auth.js";
import dotenv from "dotenv";
import bookingRoute from "./routes/booking.js";
import testRoute from "./routes/test.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

// middleware
app.use(cors(corsOptions)); // Move this line up
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/test", testRoute);

app.get("/", (req, res) => {
  res.send("Api is working");
});

// database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.error("MongoDB database connection failed", err);
  }
};

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
