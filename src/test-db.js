import pool from "./config/db.js";

try {
  const result = await pool.query("SELECT NOW()");
  console.log("Connected ✅");
  console.log(result.rows[0]);
} catch (error) {
  console.error(error);
}

await pool.end();