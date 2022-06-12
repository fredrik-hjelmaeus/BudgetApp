import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";

// Extending Express Request object with user. So req.user can hold the user and send it to next middleware.
declare global {
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ errors: [{ msg: "No token, authorization denied" }] });
  }
  try {
    const decoded: string | JwtPayload = jwt.verify(token, config.get("jwtSecret"));

    const decodedUser: IUser = typeof decoded !== "string" && decoded.user;

    req.user = decodedUser;

    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
}

export default authMiddleware;
