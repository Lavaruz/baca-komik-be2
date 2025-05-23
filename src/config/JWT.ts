import { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

declare module 'express' {
    interface Request {
      user?: any; // Ganti 'any' dengan jenis data yang sesuai untuk 'user'.
      authenticate?: boolean
    }
}

const createToken = (user:any) => {
  const accessToken = sign({id: user.id, role: user.role},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "1d"} 
  )

  return accessToken;
};

export {
  createToken,
}
