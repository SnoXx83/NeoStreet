import AbstractSeeder from "./AbstractSeeder";

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class TagSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "tag", truncate: true });
  }

  // The run method - Populate the 'item' table with fake data

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeTag = {
        label: this.faker.commerce.department(),
        refName: `tag_${i}`,
      } as object;
      this.insert(fakeTag);
    }
  }
}

// Export the ItemSeeder class
export default TagSeeder;
