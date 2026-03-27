import jwt from "jsonwebtoken";
export default async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("User is not authenticated");
    error.statusCode = 500;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (error) {
    error.statusCode = 500;
  }

  console.log(decodedToken);

  if (!decodedToken) {
    const error = new Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
