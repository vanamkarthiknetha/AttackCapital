import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success:false,message: "Missing fields!" });
    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, message: "User already exists" })
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({ email, passwordHash });
    await user.save();
    res.status(201).json({ success: true, message: "Signed Up Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try{
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success:false,message: "Missing fields!" });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ success: true, token,message:"Logged in successfully" });
} catch (error) {
  res.status(400).json({ success: false, message: "Internal server error" });
}
};
