import mongoose, { Schema } from "mongoose";

const SocialMediaLinkSchema = new Schema({
  icon: { type: String, required: true },
  url: { type: String, required: true },
  displayText: { type: String, required: true },
});

const ProfileSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  profile: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  hobbies: { type: String, required: true },
  studentId: { type: String, required: true },
  isDarkMode: { type: Boolean, required: true },
  theme: { type: String, required: true },
  genresStyles: { type: String, required: true },
  performanceExperience: { type: String, required: true },
  achievementsAwards: { type: String, required: true },
  musicEducationHistory: { type: String, required: true },
  socialMediaLinks: { type: [SocialMediaLinkSchema], required: true },
  bio: { type: String, required: true },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

export default Profile;
