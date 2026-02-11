import AbstractSeeder from "./AbstractSeeder";
import TagSeeder from "./TagSeeder";

class ProductSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "product", truncate: true, dependencies: [TagSeeder] });
  }

  run() {
    for (let i = 0; i < 20; i += 1) {
      const randomTagIndex = Math.floor(Math.random() * 10);
      const tagRef = this.getRef(`tag_${randomTagIndex}`);

      this.insert({
        name: this.faker.commerce.productName(),
        description: this.faker.commerce.productDescription(),
        price: this.faker.commerce.price(),
        image_url: this.faker.image.url(),
        stock: this.faker.number.int({ min: 1, max: 100 }),
        tag_id: tagRef.insertId,
        refName: `product_${i}`,
      } as object);
    }
  }
}
export default ProductSeeder;
