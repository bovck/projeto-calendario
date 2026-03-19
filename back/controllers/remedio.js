import Remedio from "../models/remedio.js";

export async function getRemedios(req, res, next) {
  try {
    const remedios = await Remedio.find();
    res.status(200).json({
      message: "Remedios resgatados com sucesso",
      remedios: remedios,
    });
  } catch (error) {
    console.log(error);
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
  });

  try {
    const result = await remedio.save();
    res.status(201).json({
      message: "Produto criado",
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateRemedio(req, res, next) {
  const remedioId = req.params.remedioId;
  const remedio = await Remedio.findById(remedioId);

  const time = req.body.time;
  const date = req.body.date;
  const name = req.body.name;

  remedio.time = time;
  remedio.date = date;
  remedio.name = name;
  const data = await remedio.save();
  res.status(201).json(data);
}
