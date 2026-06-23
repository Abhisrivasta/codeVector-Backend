import { faker } from "@faker-js/faker";
import pool from "../config/db.js";

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 500;

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Sports",
  "Beauty",
  "Home",
  "Toys",
];

async function seedProducts() {
  console.log("Starting seed...");

  for (let offset = 0; offset < TOTAL_PRODUCTS; offset += BATCH_SIZE) {
    const values = [];
    const placeholders = [];

    for (let i = 0; i < BATCH_SIZE; i++) {
      const name = faker.commerce.productName();

      const category =
        categories[Math.floor(Math.random() * categories.length)];

      const price = Number(
        faker.commerce.price({
          min: 10,
          max: 5000,
        })
      );

      const createdAt = faker.date.past();
      const updatedAt = createdAt;

      const base = i * 5;

      placeholders.push(
        `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`
      );

      values.push(
        name,
        category,
        price,
        createdAt,
        updatedAt
      );
    }

    const query = `
      INSERT INTO products
      (
        name,
        category,
        price,
        created_at,
        updated_at
      )
      VALUES
      ${placeholders.join(",")}
    `;

    await pool.query(query, values);

    console.log(
      `Inserted ${Math.min(
        offset + BATCH_SIZE,
        TOTAL_PRODUCTS
      )}/${TOTAL_PRODUCTS}`
    );
  }

  console.log("Seeding completed ✅");

  await pool.end();
}

seedProducts().catch((err) => {
  console.error(err);
  process.exit(1);
});