import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { IUser } from "../modules/users/userRepository";
import userRepository from "../modules/users/userRepository";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.access_token;
    // console.log(token);
    if (!token) {
      res.status(401).json({ message: "Action non autorisée" });
      return;
    }

    const tokenDecode = jwt.verify(
      token,
      process.env.SECRET_KEY || "dgjshdfguykdshgdfkjhgfjdsf0011231141.20231$$",
    ) as { user_id: string; user_email: string; role: string };
    // console.log(tokenDecode);
    const userIfExist = await userRepository.readByEmail(
      tokenDecode.user_email,
    );
    if (!userIfExist) {
      res.status(401).json({ message: "Action non autorisée" });
      return;
    }

    req.user = userIfExist;
    next();
  } catch (err) {
    console.error("Erreur VerifyToken:", err);
    res.status(500).json({
      message: "Erreur serveur",
      error: err instanceof Error ? err.message : err,
    });
    return;
  }
};
