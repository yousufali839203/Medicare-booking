import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ sucess: true, message: "sucessfuly updated ", data: updateUser });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "failed to updated " });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ sucess: true, message: "sucessfully deleted " });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "failed to  deleted " });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({ sucess: true, message: "user found", data: user });
  } catch (err) {
    res.status(404).json({ sucess: false, message: "no user found " });
  }
};

export const getAllUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({ sucess: true, message: "users found", data: users });
  } catch (err) {
    res.status(404).json({ sucess: false, message: "not found " });
  }
};

export const getUserprofile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ sucess: false, massage: "User not found" });
    }

    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      massage: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ sucess: false, massage: "Something went wrong can't get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // step -1 : retrive appointements from booking for specific user
    const bookings = await Booking.find({ user: req.userId });
    // step -2 :extract doctor ids from appointments bookings

    const doctorIds = bookings.map((el) => el.doctor.id);
    //step -3: retrive doctors using ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: doctors,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: false, massage: "Something went wrong can't get" });
  }
};
