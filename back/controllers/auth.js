import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postSignup = async (req, res, next) => {
  const name = req.body.nome;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      const error = new Error("Esse e-mail ja existe");
      error.statusCode = 500;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      password: hashedPassword,
      email: email,
    });
    await user.save();
    res.status(200).json({ message: "Conta criada com sucesso" });
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      console.log("ta chegando aqui");
      const error = new Error("Usuario invalido -> email");
      error.statusCode = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Usuario invalido -> password");
      error.statusCode = 404;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "secret",
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Usuario logado com sucesso",
      token: token,
      userId: user._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getLogin = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json({ message: "sucesso" });
};
