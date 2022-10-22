
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// 모듈화 시킨 js 파일들 불러오는 부분
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var matchingRouter = require('./routes/matching');
var groupsRouter = require('./routes/groups');
var myPageRouter = require('./routes/myPages');
var messageRouter = require('./routes/message');

var app = express();

// 라우터 예시
var exRouter = require('./routes/example');


// 왜 있는지 까먹음 (mariadb.js에 커넥션 정보 들어가있음.)
const mariadb = require('./mariadb');
mariadb.connect(function (err) {   
  if (err) {     
    console.error('mysql connection error');     
    console.error(err);     
    throw err;   
  } 
  else{
    console.log('success')
  }
});


/* DB */
// const mariadb = require('mysql');
// // Connection 객체 생성 
// const connection = mariadb.createConnection({
//     host: '127.0.0.1',
//     port: '5555',
//     user: 'root',
//     password: '1234',
//     database: 'hifiveDB',
//     connectionLimit: 5 
// });  
// // Connect
// connection.connect(function (err) {   
//   if (err) {     
//     console.error('mysql connection error');     
//     console.error(err);     
//     throw err;   
//   } 
//   else{
//     console.log('success')
//   }
// });

// var query = connection.query('select USER_ID from USER', function (err, result) {
//   if (err) {
//     console.error(err);
//     throw err;
//   }
//   else{
//     if(result.length > 0){
//       console.log(result)
//     }
//   }
// });



// var mariadb = require('mariadb');
// console.log("start");
// // DB 연결설정
// const pool = mariadb.createPool({
//     host: '127.0.0.1',
//     port: '5555',
//     user: 'root',
//     password: '1234',
//     database: 'hifiveDB',
//     connectionLimit: 5
// });

// // 에이전트 : 여기에 db를 보내서 처리할 것임
// async function asyncFunction(query_, db_) {

//     const pool = mariadb.createPool({
//         host: '127.0.0.1',
//         port: '5555',
//         user: 'root',
//         password: '1234',
//         database: db_,
//         connectionLimit: 5
//     });

//     console.log("start");
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         console.log("try--");
//         const rows = await conn.query(query_);
//         console.log(rows);
//     } catch (err) {
//         throw err;
//     } finally {
//         console.log("finally");
//         if (conn) return conn.end();
//     }
// }

// // test용 쿼리
// // 각각 처리 함수를 제작하여 동작하도록 변경해야함.
// // 각각 처리 함수? : 로그인 폼 데이터 처리, 회원가입 데이터 처리 등등
// asyncFunction("SELECT * FROM USER;", 'hifiveDB');
/* DB End */





// 기본 세팅된 부분
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// -----------------


// 각 모듈(js 파일)별 기본 접근 경로와 js 파일 매칭
/* ex)
  home.js 파일에서 /hello 경로로 접근 시 "hello" 라는 문장을 출력하는 상황
  (중복 등의 문제로) 그런데 실제 경로는 /api/home/hello 형식

  여기 (app.js)에서는
  윗단에서
  var homeRouter = require('./routes/home'); (home.js를 불러오는 것)
  
  아랫단에서
  app.use('/api/home, homeRouter);
  형태로 쓰면 됨.
  */
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/matching', matchingRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/myPages', myPageRouter);
app.use('/api/message', messageRouter);
app.use('/api/example', exRouter);


// 잘 모르겠는데 404 상태에 출력하는 부분 같음
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

