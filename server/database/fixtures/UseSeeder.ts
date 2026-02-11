import AbstractSeeder from "./AbstractSeeder";

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class TagSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'item' table with fake data

  run() {
    // Generate and insert fake data into the 'item' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake item data
      const fakeUser = {
        lastname: this.faker.lorem.word(),
        firstname: this.faker.lorem.word(),
        email: this.faker.lorem.word(),
        password: this.faker.lorem.word(),
        logo_url: this.faker.number.int(),
      };
      this.insert(fakeUser);
    }
  }
}

// Export the ItemSeeder class
export default TagSeeder;
