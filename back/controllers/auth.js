import User from "../models/user.js";
import bcrypt from "bcryptjs";
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

export const loginSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
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
    res
      .status(200)
      .json({ message: "Usuario logado com sucesso", isAuth: true });
  } catch (error) {
    next(error);
  }
};
