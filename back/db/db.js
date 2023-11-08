import pg from "pg"; 

const pool = new pg.Pool({
    user: 'students_2221_11',
    password: 'kalabass22',
    host: 'pgdb.uni-dubna.ru',
    database: 'students_2221_11',
    port: 5432
})

export default pool;