import User from "../models/User.js";
import { generateToken } from "../lib/utilis.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudnary.js";

// -------- SIGNUP --------
export const signup = async (req, res) => {
  try {
    const { email, fullname, password, bio } = req.body;
    if (!email || !fullname || !password || !bio) {
      return res.json({ success: false, message: "Missing details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ success: false, message: "Account already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullname, email, password: hashedPassword, bio });

    const token = generateToken(newUser._id);
    const { password: _, ...safeUser } = newUser.toObject();

    res.json({ success: true, user: safeUser, token, message: "Account created" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// -------- LOGIN --------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return res.json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id);
    const { password: _, ...safeUser } = user.toObject();

    res.json({ success: true, user: safeUser, token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// -------- CHECK AUTH --------
export const checkAuth = (req, res) => {
  const { password, ...safeUser } = req.user.toObject();
  res.json({ success: true, user: safeUser });
};

// -------- UPDATE PROFILE --------
export const updateProfile = async (req, res) => {
  try {
    const { fullname, bio, profilePic } = req.body;
    const updateFields = {};

    if (fullname) updateFields.fullname = fullname;
    if (bio) updateFields.bio = bio;

    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic);
      updateFields.profilePic = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateFields, { new: true });
    const { password, ...safeUser } = updatedUser.toObject();

    res.json({ success: true, user: safeUser, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
