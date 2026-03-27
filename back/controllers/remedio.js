import Remedio from "../models/remedio.js";
import User from "../models/user.js";

export async function getRemedios(req, res, next) {
  try {
    const remedios = await Remedio.find();
    res.status(200).json({
      message: "Remedios resgatados com sucesso",
      remedios: remedios,
    });
  } catch (error) {
    next(error);
  }
}

export async function postRemedio(req, res, next) {
  const date = req.body.date;
  const name = req.body.name;
  const time = req.body.time;
  const remedio = new Remedio({
    date: date,
    name: name,
    time: time,
    creator: req.userId,
  });

  try {
    await remedio.save();
    const user = await User.findById(req.userId);
    user.remedios.push(remedio);
    await user.save();

    res.status(201).json({
      message: "Produto criado",
      remedio: remedio,
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateRemedio(req, res, next) {
  try {
    const remedioId = req.params.remedioId;
    const remedio = await Remedio.findById(remedioId);

    if (remedio.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 401;
      throw error;
    }

    const time = req.body.time;
    const date = req.body.date;
    const name = req.body.name;

    remedio.time = time;
    remedio.date = date;
    remedio.name = name;
    const data = await remedio.save();
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}
