import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

import type { User } from "./userEntity";

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (firstname, lastname, email, password, logo_url) values (?, ?, ?, ?, ?)",
      [user.firstname, user.lastname, user.email, user.password, user.logo_url],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async readByEmail(email: string) {
    // On récupère toutes les colonnes pour pouvoir vérifier le mot de passe haché
    const [rows] = await databaseClient.query<UserRow[]>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );

    // database.query renvoie un tableau.
    // On retourne la première ligne si elle existe, sinon undefined.
    return rows[0];
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Return the array of users
    return rows as User[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  // async update(user: user) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new UserRepository();
