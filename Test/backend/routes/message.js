require("dotenv").config();

var express = require('express');
var router = express.Router();


const jwt = require("jsonwebtoken");
const connection = require('../mariadb');

router.get('/', function(req, res) {
  let authHeader = req.headers["authorization"];
  let accessToken = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY,
    (err, user) => {
      if(err) {
        console.log(err)
        return res.sendStatus(403);
      }
      //
    });
});

router.post('/', function(req, res) {
  const message_num = req.body.message_num
  let authHeader = req.headers["authorization"];
  let accessToken = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY,
    (err, user) => {
      if(err) {
        console.log(err)
        return res.sendStatus(403);
      }
      let q1 = "SELECT COUNT(*) AS COUNT FROM message_user WHERE USER_ID = ?"
      connection.query(q1, user.Id, function (err1, result1) {
        if (err1) {
          return res.sendStatus(500)
        }
        if (!result1[0].COUNT){
          return res.sendStatus(403);
        }
        else{
          let q2 = "SELECT SENDER_NICKNAME as NICKNAME, (SENDER_ID = ?) AS MY_MESSAGE, CONTENT, CREATED_AT FROM message_content WHERE MESSAGE_NUM = ? ORDER BY CREATED_AT"
          connection.query(q2, [user.Id, message_num], function (err2, result2) {
            if (err2) {
              return res.sendStatus(500)
            }
            if (result2[0] == undefined){
              return res.status(200).json({isEmpty: true});
            }
            else{
              return res.status(200).json({isEmpty: false, result: result2});
            }
          });
        }
      });

    });
});

router.get('/list', function(req, res) {
  let authHeader = req.headers["authorization"];
  let accessToken = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY,
    (err, user) => {
      if(err) {
        console.log(err)
        return res.sendStatus(403);
      }
      let q1 = "SELECT u.MESSAGE_NUM, u.USER_ID, c.SENDER_ID, c.SENDER_NICKNAME, c.CONTENT, c.CREATED_AT FROM message_user u, message_content c WHERE u.MESSAGE_NUM = c.MESSAGE_NUM AND u.MESSAGE_NUM IN (SELECT MESSAGE_NUM FROM message_user WHERE USER_ID = ?) AND u.USER_ID != ? AND c.CREATED_AT IN (SELECT MAX(CREATED_AT) FROM message_content WHERE MESSAGE_NUM = c.MESSAGE_NUM) GROUP BY MESSAGE_NUM"
      connection.query(q1, [user.Id, user.Id], function (err1, result1) {
        if (err1) {
          return res.sendStatus(500)
        }
        if (result1[0] == undefined){
          return res.status(200).json({isEmpty: true});
        }
        else{
          return res.status(200).json({isEmpty: false, result: result1 })
        }
      });
    });
});

router.post('/create', function(req, res) {
  const target_user = req.body.target_user
  let authHeader = req.headers["authorization"];
  let accessToken = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY,
    (err, user) => {
      if(err) {
        console.log(err)
        return res.sendStatus(403);
      }
      let q0 = "SELECT COUNT(*) AS COUNT, MESSAGE_NUM FROM message_user WHERE USER_ID = ? AND MESSAGE_NUM IN (SELECT MESSAGE_NUM FROM message_user WHERE USER_ID = ?);"
      let params1 = [ user.Id, target_user ]
      connection.query(q0, params1, function (err2, result) {
        if (err2) {
          return res.sendStatus(500)
        }
        if (result[0].COUNT){
          return res.status(200).json({isExist: true, message_num: result[0].MESSAGE_NUM});
        }
        else{
          let q1 = "INSERT INTO message() VALUE(); "
          let q2 = "SELECT LAST_INSERT_ID() AS LAST; "
          connection.query(q1 + q2, function (err2, result2) {
            if (err2) {
              return res.sendStatus(500)
            }
            let q3 = "INSERT INTO message_user(MESSAGE_NUM, USER_ID) VALUES(?, ?); "
            let q4 = "INSERT INTO message_user(MESSAGE_NUM, USER_ID) VALUES(?, ?); "
            let params2 = [ result2[1][0].LAST, user.Id, result2[1][0].LAST, target_user ]
            connection.query(q3 + q4, params2, function (err3, result3) {
              if (err3) {
                return res.sendStatus(500)
              }
              return res.status(200).json({isExist: false, message_num: result2[1][0].LAST});
            });
          });
        }
      });
    });
});

router.post('/send', function(req, res) {
  const message_num = req.body.message_num
  const content = req.body.content
  let authHeader = req.headers["authorization"];
  let accessToken = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY,
    (err, user) => {
      if(err) {
        console.log(err)
        return res.sendStatus(403);
      }
      let q1 = "SELECT COUNT(*) AS COUNT FROM message_user WHERE USER_ID = ?"
      connection.query(q1, user.Id, function (err1, result1) {
        if (err1) {
          return res.sendStatus(500)
        }
        if (!result1[0].COUNT){
          return res.sendStatus(403);
        }
        else{
          let q2 = "INSERT INTO message_content(MESSAGE_NUM, SENDER_ID, SENDER_NICKNAME, CONTENT) VALUES(?, ?, ?, ?)"
          let params = [message_num, user.Id, user.Nickname, content]
          connection.query(q2, params, function (err2, result2) {
            if (err2) {
              return res.sendStatus(500)
            }
            return res.sendStatus(200);
          });
        }
      });
    });
});

// connection.query(query, [user.Id, user.Id, user.Id, user.Id], function (err, result) {
//     if (err) {
//       return res.status(500)
//     }
//     const myPosts = {
//       myMajor: { isEmpty: result[0][0] == undefined, data: result[0] },
//       myUniv: { isEmpty: result[1][0] == undefined, data: result[1] },
//       friends: { isEmpty: result[2][0] == undefined, data: result[2] },
//       club: { isEmpty: result[3][0] == undefined, data: result[3] }
//     }
//     return res.status(200).json({
//       myPosts
//     })
// });

module.exports = router;