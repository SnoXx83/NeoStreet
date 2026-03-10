import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository, { type IUser } from "../../modules/users/userRepository";

const login: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Identifiant requis" });
      return;
    }

    // get all userData by email
    const userIfExist = await userRepository.readByEmail(email);

    if (!userIfExist) {
      res.status(401).json({ message: "Identifiants  invalides" });
      return;
    }

    // compare hashed password with the clear password
    const isValidPassword = await argon2.verify(userIfExist.password, password);

    if (!isValidPassword || !process.env.SECRET_KEY) {
      res.status(401).json({ message: "Identifiants  invalides" });
      return;
    }

    // create the token with userId, userEmail, role and the secretKey
    const token = jwt.sign(
      { user_id: userIfExist.id, user_email: userIfExist.email, role: "user" },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    // post jwt in the cookies with 8h of expiration
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({ message: "Connexion réussit !" });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ message: "erreur" });
  }
};

export default { login };
