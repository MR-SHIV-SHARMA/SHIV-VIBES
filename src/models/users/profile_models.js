import mongoose, { Schema } from "mongoose";

const ProfileSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  profile: { type: String, required: false },
  firstName: { type: String, required: false },
  birthday: { type: String, required: true }, // Ensure this line is present
  lastName: { type: String, required: false },
  phone: { type: String, required: false },
  city: { type: String, required: false },
  hobbies: { type: String, required: false },
  studentId: { type: String, required: false },
  genresStyles: { type: String, required: false },
  performanceExperience: { type: String, required: false },
  achievementsAwards: { type: String, required: false },
  musicEducationHistory: { type: String, required: false },
  SocialMediaLinkForInstagram: { type: String, required: false },
  SocialMediaLinkForYoutube: { type: String, required: false },
  SocialMediaLinkForLinkdin: { type: String, required: false },
  bio: { type: String, required: false },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

export default Profile;
