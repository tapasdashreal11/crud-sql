import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const generateToken = (id) => {
    console.log("oken",process.env)
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;