// 아래의 JWT 토큰 키 불러오기 위함
require("dotenv").config();

// 기본 express 서식
var express = require('express');
var router = express.Router();

var requestIp = require('request-ip');

// JWT 토큰 관련 모듈 불러오기
const jwt = require("jsonwebtoken");
// 비밀번호 암호화 관련 모듈 불러오기
const bcrypt = require('bcryptjs')

// maria DB 커넥션 관련 모듈 불러오기 (connection을 이용해 쿼리 전송 가능)
const connection = require('../mariadb');


// get 방식은 router.get('/접근경로명, 접근 시 실행할 함수')
// 아래는 post 형식 요청 처리 (req.body 형태로 프론트에서 전달된 파라미터 접근 가능)
// RESTful API는 아래와 같이 동사가 들어가는 문장은 사용하지 않는 것이 바람직
// 아래의 경로를 적절한 형태로 바꾸면 '/check' 혹은 '/idOverlap 정도?
router.post('/check/ID', function (req, res){
  // console.log( ) 형식으로 콘솔에 데이터 출력 가능 (디버그 시에만 활용)
  console.log('ID Overlap Test')

  // connection.query('쿼리문', 쿼리문 결과 데이터(여기서는 row)를 처리할 함수)
  // 아래는 처음에 아무것도 모를 때 짠 코드 실제로는 아래처럼
  // connection.query(q1, [param1, param2], function (err, row){ }) 같이 쓰는게 좋음
  const q1 = 'SELECT * FROM USER WHERE user_id = ?';
  const param1 = req.body.reg_id;
  connection.query(q1, param1, function (err, row) {
    // 쿼리 문이 잘못된 경우, err가 반환됨
    if (err) throw err;

    // 쿼리 문 결과가 없는 경우, row[0]는 undefined 상태
    // 이 코드는 중복된 ID가 있는지 확인하는 용도이므로 검색 결과가 없어야 success: true 전송
    if (row[0] == undefined){
      // res는 result의 줄임
      // res.sendStatus(400)  --> 서버 상태 코드(400, 요청 오류)만 전송
      // res.json({json 형태의 데이터})  --> json 결과만 전송
      // res.status(400).json({ ... }) --> 서버 상태 코드와 json 둘 다 전송 (권장)
      res.json({
        success: true,
        message: 'Available ID'
      })
    }
    // 그 외의 경우(사용하려는 ID가 중복됨)
    else {
      res.json({
        success: false,
        message: 'duplicate exists'
      })
    }
  });
});

router.post('/checkNickOverlap', function (req, res){
  console.log('Nickname Overlap Test')
  connection.query('SELECT * FROM USER WHERE USER_NICKNAME = "' + req.body.reg_nickname + '"', function (err, row) {
    if (err) throw err;
    if (row[0] == undefined){
      res.json({
        success: true,
        message: 'Available Nickname'
      })
    }
    else {
      res.json({
        success: false,
        message: 'duplicate exists'
      })
    }
  });
});

router.post('/signUp', function (req, res) {
  const reg_data = {
    reg_id: req.body.reg_id,
    reg_password: req.body.reg_password_crpt,
    reg_name: req.body.reg_name,
    reg_phone: req.body.reg_phone,
    reg_privacy_agreement: req.body.reg_privacy_agreement,
    reg_consent_marketing: req.body.reg_consent_marketing
  };

  const q1 = 'INSERT INTO user(user_id, user_pwd, user_name, user_phone, user_mkt_cns) VALUES (?, ?, ?, ?, ?)';
  const param1 = reg_data.reg_id;
  const param2 = reg_data.reg_password;
  const param3 = reg_data.reg_name;
  const param4 = reg_data.reg_phone;
  const param5 = reg_data.reg_consent_marketing;

  connection.query(q1, [param1, param2, param3, param4, param5], function (err, row) {
    if (err){
      res.json({
        success: false,
        message: 'error'
      })
      throw err;
    }
    else{
      res.json({
        success: true,
        message: 'Sign Up Success!'
      })
    }  
  });
});

const generateAccessToken=(user) =>{
  return jwt.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: '30m' })
  //return jwt.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' })
};

const generateRefreshToken=(user) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN_KEY, { expiresIn: '30 days' })
  //return jwt.sign(user, process.env.REFRESH_TOKEN_KEY, { expiresIn: '30 days' })
};


function input_checker(val){
  var reg1 = /^[a-z0-9]{5,20}$/;
  var reg2 = /[a-z]/g;    
  var reg3 = /[0-9]/g;
  if(reg1.test(val) &&  reg2.test(val) && reg3.test(val)){
    return true;
  }
  else return false;
}


router.post('/login', function (req, res) {
  if(!input_checker(req.body.userId)){
    return res.sendStatus(400);
  }
  const q1 = 'SELECT * FROM user WHERE user_id = ?';
  const param1 = req.body.userId;
  connection.query(q1, param1, function (err, row) {
    if (err) throw err;
    if (row[0] == undefined){
      const q_t = 'INSERT INTO login_log(login_scdd, request_ip) VALUES(?, ?)'
      const param_t1 = false
      const param_t2 = requestIp.getClientIp(req)
      connection.query(q_t, [param_t1, param_t2], function (err2, row2) {
        if(err2) throw err2;
      });
      res.json({
        success: false,
        message: 'ID does not exist'
      })
      return;
    };
    const check = bcrypt.compareSync(req.body.userPassword, row[0].user_pwd)
    if (check){
      const user = {
        id: row[0].user_id,
        name: row[0].user_name,
        phone: row[0].user_phone
      };
      let accessToken = generateAccessToken(user);
      let refreshToken = generateRefreshToken(user);
      let query1 = "DELETE FROM token WHERE user_id = '" + req.body.userId + "'; "
      let query2 = "INSERT INTO token(user_id, refresh_token) VALUES ('" + req.body.userId + "', '" + refreshToken + "'); "
      let query3 = 'INSERT INTO login_log(login_scdd, request_ip) VALUES(?, ?);'
      const param_t1 = true
      const param_t2 = requestIp.getClientIp(req)
      connection.query(query1 + query2 + query3, [param_t1, param_t2], function (err2, row2) {
        if (err2) throw err2;
      });
      res.json({
        user,
        accessToken,
        refreshToken,
        success: true,
        message: 'login success'
      })
    }
    else {
      res.json({
        success: false,
        message: 'PW does not match'
      })
    }
  });
});



router.post('/logout', function (req, res) {
  if (req.body.userId == '')
    return res.sendStatus(400);
  connection.query("DELETE FROM token WHERE user_id = '" + req.body.userId + "'", function (err, row) {
    if (err) throw err;
  });
  return res.sendStatus(200);
});

//access 유효성 확인
const authenticateAccessToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
      console.log("토큰 형식 오류");
      return res.sendStatus(400);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, user) => {
      if (error) {
          console.log(error);
          return res.sendStatus(403);
      }
      req.user = user;
      next();
  });
};

function getRefToken(userId, callback) {
  connection.query("SELECT refresh_token FROM token user_id = '" + userId + "'", function (err, row) {
    if (err) callback(err, null);
    else{
      callback(null, row[0].refresh_token);
    }
  });  
};


// jwt 토큰 리프레시를 위한 함수 (로그인 정보 유지용)
// 현재는 vue의 라우터 가드를 이용해 페이지 이동 시에 항상 토큰 리프레시를 수행하도록 함. 
router.post("/refresh", (req, res) => {
  let userId = req.body.userId;

  // jwt 토큰을 별도로 보내는 방식이 아닌, http 헤더에 jwt 토큰을 담아 전달하는 방식으로 프론트 구현된 상태
  let authHeader = req.headers["authorization"];
  // jwt 토큰은 "(뭔가 있었음) bdba212ba....." 과 같이
  // 띄어쓰기로 구분되어 있음.
  let accessToken = authHeader && authHeader.split(" ")[1];

  if (!userId || !accessToken) return res.status(200).json({ state: false, message: "login required"});


  // jwt 토큰의 유효성을 검사하는 부분.
  // jwt.verify(액세스 토큰, 사전에 설정한 키, 유효성이 확인된 후 실행할 함수) 형태
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY,   // backend 폴더 내 톱니바퀴 모양의 .env 파일 확인 요 
    (error, user) => {
        if (error) {
          connection.query("SELECT refresh_token FROM token WHERE user_id = '" + userId + "'", function (err, row) {
            if (err) throw err;
            if (row[0] == undefined){
              return res.status(200).json({state: false, message: "access and refresh token expired"}); // case 1: acc 만료, ref 토큰 존재 X
            }
            else {
              jwt.verify(
                row[0].refresh_token,
                process.env.REFRESH_TOKEN_KEY,
                (err, user2) => {
                  if(err) {
                    console.log(err)
                    return res.status(200).json({state: false, message: "refresh token expired"});
                  }
                  const user_d = {
                    id: user2.id,
                    name: user2.name,
                    phone: user2.phone
                  };
                  const newAccToken = generateAccessToken(user_d)
                  return res.status(200).json({   // case 2: ref 토큰 유효, acc만 만료된 경우 acc 토큰 재발급
                    state: true, 
                    refreshed: 'access',
                    newToken: newAccToken,
                    message: "access token refreshed"
                  })
                }
              )
            }
          });
        }
        else{
          connection.query("SELECT refresh_token FROM token WHERE user_id = '" + userId + "'", function (err, row) {
            if (err) throw err;
            if (row[0] == undefined){
              console.log("asfmkaslf")
              return res.status(200).json({
                state: false,
                message: "refresh token expired"
              })
              // connection.query("INSERT INTO token(user_id, REFRESH_TOKEN) VALUES ('" + userId + "', '" + refreshToken + "')", function (err2, row2) {
              //   if (err2) throw err2;
              // });
              // return res.json({
              //   refreshed: true,
              //   newToken: null
              // }) // case 3: acc 유효, ref 토큰 존재 X
            }
            else {
              jwt.verify(
                row[0].refresh_token,
                process.env.REFRESH_TOKEN_KEY,
                (err, user2) => {
                  if(err) {
                    const user_d = {
                      id: user.id,
                      name: user.name,
                      phone: user.phone
                    };
                    const newRefToken = generateAccessToken(user_d)
                    connection.query("UPDATE token SET refresh_token = '"+ newRefToken +"' WHERE user_id = '" + userId + "'", function (err, row) {
                      if (err) throw err;
                    });
                    return res.status(200).json({   // case 4: ref 토큰 만료, acc만 유효한 경우 ref 토큰 재발급
                      state: true, 
                      refreshed: 'refresh',
                      newToken: null,
                      message: "refresh token refreshed"
                    })
                  }
                  else{
                    res.status(200).json({   // case 5: 모두 유효
                      state: true, 
                      refreshed: 'none',
                      newToken: null,
                      message: "ok"
                    })
                  }
                }
              )
            }
          });
        }
    }
  );


  // connection.query("SELECT refresh_token FROM token WHERE user_id = '" + userId + "'", function (err, row) {
  //   if (err) throw err;
  //   if (row[0] == undefined){
  //     res.json({
  //       success: false,
  //       message: 'login required'
  //     })
  //   }
  //   else {

  //   }
  // });
  // jwt.verify(
  //     refreshToken,
  //     process.env.REFRESH_TOKEN_KEY,
  //     (error, user) => {
  //         if (error) return res.sendStatus(403);
  //         const accessToken = generateAccessToken(user);
  //         res.json({ accessToken });
  //     }
  // );
});

/* GET users listing. */
router.get('/', authenticateAccessToken, (req, res) => {
  console.log(req.user);
  console.log(res);
  res.sendStatus(200);
});

module.exports = router;
