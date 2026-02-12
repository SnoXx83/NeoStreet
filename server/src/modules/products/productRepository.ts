import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

import type { Product } from "./productEntity";

class ProductRepository {
  // The C of CRUD - Create operation

  async create(product: Omit<Product, "id">) {
    // Execute the SQL INSERT query to add a new product to the "product" table
    const [result] = await databaseClient.query<Result>(
      "insert into product (name, description, price, image_url, stock, tag_id) values (?, ?, ?, ?, ?, ?)",
      [
        product.name,
        product.description,
        product.price,
        product.image_url,
        product.stock,
        product.tag_id,
      ],
    );

    // Return the ID of the newly inserted product
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific product by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from product where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the product
    return rows[0] as Product;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all products from the "product" table
    const [rows] = await databaseClient.query<Rows>("select * from product");

    // Return the array of products
    return rows as Product[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing product

  // async update(product: product) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an product by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ProductRepository();
