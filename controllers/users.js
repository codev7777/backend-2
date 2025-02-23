const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message || "There was a server error.");
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body; // Accept role from request

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(403).json({ error: "User already exists." });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashPassword, role: role || "user" }, // Default role: user
    });

    const token = JWT.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "User created.", token });
  } catch (error) {
    return res.status(500).json(error.message || "Server error.");
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = JWT.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    return res.status(500).json(error.message || "Server error.");
  }
};


const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json({
      message: "User has been deleted.",
    });
  } catch (error) {
    return res.status(500).json(error.message || "There was a server error.");
  }
};


module.exports = { getUsers, createUser, deleteUser, signIn };
