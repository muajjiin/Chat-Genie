import User from "../models/User.js";
import { generateToken } from "../lib/utilis.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudnary.js"; // make sure file name is consistent

// ----------------- Signup a new user -----------------
export const signup = async (req, res) => {
  try {
    const { email, fullname, password, bio } = req.body;

    if (!email || !fullname || !password || !bio) {
      return res.json({ success: false, message: "Missing details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullname, email, password: hashedPassword, bio });
    await newUser.save();

    const token = generateToken(newUser._id);

    // remove password before sending
    const { password: _, ...safeUser } = newUser.toObject();

    res.json({
      success: true,
      user: safeUser,
      message: "Account created",
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ----------------- Login a user -----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);

    const { password: _, ...safeUser } = userData.toObject();

    res.json({ success: true, user: safeUser, token, message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ----------------- Get current user details -----------------
export const checkAuth = (req, res) => {
  const { password, ...safeUser } = req.user.toObject();
  res.json({ success: true, user: safeUser });
};

// ----------------- Update user profile -----------------
export const updateProfile = async (req, res) => {
  try {
    const { fullname, bio, profilePic } = req.body;
    const userId = req.user._id;

    const updateFields = {};
    if (fullname) updateFields.fullname = fullname;
    if (bio) updateFields.bio = bio;
    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic);
      updateFields.profilePic = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    const { password, ...safeUser } = updatedUser.toObject();

    res.json({
      success: true,
      user: safeUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
