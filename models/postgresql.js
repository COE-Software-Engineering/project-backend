import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

// generating env variables
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// export default pool;
export const query = async (text, params, callback) => {
  try {
    return await pool.query(text, params, callback);
  } catch (err) {
    throw err;
  }
};
