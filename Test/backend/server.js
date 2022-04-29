var mariadb = require('mariadb');
console.log("start");
// DB 연결설정
const pool = mariadb.createPool({
    host: '127.0.0.1',
    port: '5555',
    user: 'root',
    password: '1234',
    database: 'hifiveDB',
    connectionLimit: 5
});

// 에이전트 : 여기에 db를 보내서 처리할 것임
async function asyncFunction(query_, db_) {

    const pool = mariadb.createPool({
        host: '127.0.0.1',
        port: '5555',
        user: 'root',
        password: '1234',
        database: db_,
        connectionLimit: 5
    });

    console.log("start");
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("try--");
        const rows = await conn.query(query_);
        console.log(rows);
    } catch (err) {
        throw err;
    } finally {
        console.log("finally");
        if (conn) return conn.end();
    }
}

// test용 쿼리
// 각각 처리 함수를 제작하여 동작하도록 변경해야함.
// 각각 처리 함수? : 로그인 폼 데이터 처리, 회원가입 데이터 처리 등등
asyncFunction("SELECT * FROM USER;", 'hifiveDB');