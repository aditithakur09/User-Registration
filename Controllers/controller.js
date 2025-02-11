const UserRegistration = require("../Models/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    const { fullName, emailAddress, password } = req.body;
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserRegistration.create({
      fullName,
      emailAddress,
      password: hashedPassword, // Store hashed password
    });
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const user = await UserRegistration.findOne({ where: { emailAddress } });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const getUser = async (req, res) => {
  try {
    const user = await UserRegistration.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// const getUser = async (req, res) => {
//   try {
//     const user = await UserRegistration.findByPk(req.user.id, {
//       attributes: { exclude: ["password"] }
//     });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const updateUser = async (req, res) => {
  try {
    const { fullName, emailAddress, password } = req.body;
    const user = await UserRegistration.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If password is being updated, hash it before saving
    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    // Update user fields
    user.fullName = fullName || user.fullName;
    user.emailAddress = emailAddress || user.emailAddress;
    user.password = updatedPassword;
    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserRegistration.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  loginUser,
  getUser,
  deleteUser
};