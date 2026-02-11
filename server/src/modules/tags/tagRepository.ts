import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { Tag } from "./tagEntity";

class TagRepository {
  // The C of CRUD - Create operation

  async create(tag: Omit<Tag, "id">) {
    // Execute the SQL INSERT query to add a new tag to the "tag" table
    const [result] = await databaseClient.query<Result>(
      "insert into tag (label) values (?)",
      [tag.label],
    );

    // Return the ID of the newly inserted tag
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific tag by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from tag where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the tag
    return rows[0] as Tag;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all tags from the "tag" table
    const [rows] = await databaseClient.query<Rows>("select * from tag");

    // Return the array of tags
    return rows as Tag[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing tag

  // async update(tag: tag) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an tag by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new TagRepository();
