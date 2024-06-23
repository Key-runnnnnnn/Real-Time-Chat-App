import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })
    if (newUser) {
      // generate JWT token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic
      })
    }
    else {
      res.status(400).json({ message: "Invalid user data" })
    }

  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({ error: "internal server error" })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user?.password || "");

    if(!user || !validPassword) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    // generate JWT token
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
      message: "User logged in successfully"
    })

  } catch (error) {
     console.log("Error in login controller", error.message)
    res.status(500).json({ error: "internal server error" })
  }
}

const logout = (req, res) => {
  try {
    res.cookie('jwt',"",{maxAge:0})
    res.status(201).json({ message: "User logged out successfully" })
  } catch (error) {
    console.log("Error in logout controller", error.message)
    res.status(500).json({ error: "internal server error" })
  }
}  

export { login, signup, logout };