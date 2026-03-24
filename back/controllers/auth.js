import User from "../models/user.js";
export const postSignup = (req, res, next) => {
  const name = req.body.nome;
  const password = req.body.password;
  const email = req.body.email;

  const user = new User({
    name: name,
    password: password,
    email: email,
  });

  User.findOne(user)
    .then((u) => {
      if (u) {
        const error = new Error("Esse e-mail ja existe");
        error.statusCode = 500;
        throw error;
      }
      return user.save();
    })
    .then(() => {
      res.status(200).json({ message: "Conta criada com sucesso" });
    })
    .catch((err) => {
      console.log(err);
    });
};
