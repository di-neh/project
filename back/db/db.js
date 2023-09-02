import pg from "pg"; 

const pool = new pg.Pool({
    user: 'postgres',
    password: 'kalabass229965',
    host: 'localhost',
    database: 'BlackNYellowDb',
    port: 3000
})

export default pool;

