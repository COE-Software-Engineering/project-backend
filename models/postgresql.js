import { Pool } from "pg";

const pool = new Pool({
    user: '',
    password: '',
    host: 'localhost',
    database: '',
    port:'5432'
})


// export default pool;
export const query = (text, params, callback) => {
    return pool.query(text, params, callback);
}