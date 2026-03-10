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
        lastname: this.faker.person.lastName(),
        firstname: this.faker.person.firstName(),
        email: this.faker.internet.email(),
        password: this.faker.internet.password(),
        logo_url: this.faker.image.avatar(),
      };
      this.insert(fakeUser);
    }
  }
}

// Export the ItemSeeder class
export default TagSeeder;
