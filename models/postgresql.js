import pg from "pg";
const { Pool } = pg;
// import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    database: 'classroom_assistant',
    port:'5432'
})


// export default pool;
export const query = async (text, params, callback) => {
    try{
        return await pool.query(text, params, callback);
    }
    catch(err){
        console.log(err);
    }
}