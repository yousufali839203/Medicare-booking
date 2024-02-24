import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary";
import { toast } from "react-toastify";
import { BASE_URL, token } from "./../../config";
const profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle file input changes
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
  };

  // Function to handle profile update
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
    // Logic for updating profile
  };

  // Function to add items to an array in the state
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item], // Fixed array update
    }));
  };

  // Function to handle reusable input changes
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  // Function to add a new qualification item to the state array
  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const addTimeSlots = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "monday",
      startingTime: "",
      endingTime: "",
    });
  };
  // Function to delete a qualification item from the state array
  const deleteQualification = (index) => {
    // e.preventDefault();
    // deleteItem("qualifications", index);
    setFormData((prevFormData) => {
      const updatedQualifications = [...prevFormData.qualifications];
      updatedQualifications.splice(index, 1);
      return { ...prevFormData, qualifications: updatedQualifications };
    });
  };

  // Function to delete a qualification item from the state array
  const deleteTimeSlots = (index) => {
    // e.preventDefault();
    // deleteItem("qualifications", index);
    setFormData((prevFormData) => {
      const updatedTimeSlots = [...prevFormData.timeSlots];
      updatedTimeSlots.splice(index, 1);
      return { ...prevFormData, timeSlots: updatedTimeSlots };
    });
  };
  const deleteExperience = (index) => {
    // e.preventDefault();
    // deleteItem("qualifications", index);
    setFormData((prevFormData) => {
      const updatedExperiences = [...prevFormData.experiences];
      updatedExperiences.splice(index, 1);
      return { ...prevFormData, experiences: updatedExperiences };
    });
  };

  // Function to handle changes in qualification details
  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const handleTimeSlotsChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };
  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-[10]">
        Profile Information
      </h2>

      <form action="">
        <div className="mb-5">
          <p className="form_lebel">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form_input"
          />
        </div>

        <div className="mb-5">
          <p className="form_lebel">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form_input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>

        <div className="mb-5">
          <p className="form_lebel">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form_input"
          />
        </div>

        <div className="mb-5">
          <p className="form_lebel">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form_input"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_lebel">Gender</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                id=""
                className="form_input py-3.5"
              >
                <option value="">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <p className="form_lebel">Specialization</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                id=""
                className="form_input py-3.5"
              >
                <option value="">select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>

            <div>
              <p className="form_lebel">Ticket Price *</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form_input"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form_lebel">Qualification*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 ">
                  <div>
                    <p className="form_lebel">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form_lebel">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-5 mt-5 ">
                  <div>
                    <p className="form_lebel"> Degree</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form_lebel">University</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={() => deleteQualification(index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addQualification}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer "
          >
            Add Qualification
          </button>
        </div>

        <div className="mb-5">
          <p className="form_lebel">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 ">
                  <div>
                    <p className="form_lebel">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form_input"
                      onChange={(e) => {
                        handleExperienceChange(e, index);
                      }}
                    />
                  </div>

                  <div>
                    <p className="form_lebel">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form_input"
                      onChange={(e) => {
                        handleExperienceChange(e, index);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-5 mt-5 ">
                  <div>
                    <p className="form_lebel"> Position</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form_input"
                      onChange={(e) => {
                        handleExperienceChange(e, index);
                      }}
                    />
                  </div>

                  <div>
                    <p className="form_lebel">Hospital</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      className="form_input"
                      onChange={(e) => {
                        handleExperienceChange(e, index);
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    deleteExperience(index);
                  }}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer "
          >
            Add Experience
          </button>
        </div>

        <div className="mb-5">
          <p className="form_lebel">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5 ">
                  <div>
                    <p className="form_lebel"> Day</p>
                    <select
                      name="day"
                      value={item.day}
                      className="form_input py-3.5"
                      onChange={(e) => {
                        handleTimeSlotsChange(e, index);
                      }}
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <p className="form_lebel">Starting Time</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form_input"
                      onChange={(e) => {
                        handleTimeSlotsChange(e, index);
                      }}
                    />
                  </div>
                  <div>
                    <p className="form_lebel">Ending Time</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form_input"
                      onChange={(e) => {
                        handleTimeSlotsChange(e, index);
                      }}
                    />
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        deleteTimeSlots(index);
                      }}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px]   cursor-pointer mt-6"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>

              <div></div>
            </div>
          ))}

          <button
            onClick={addTimeSlots}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer "
          >
            Add TimeSlot
          </button>
        </div>
        <div className="mb-5">
          <p className="form_lebel"> About*</p>
          <textarea
            rows={5}
            value={formData.about}
            name="about"
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form_input"
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-between">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg ,.png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default profile;
