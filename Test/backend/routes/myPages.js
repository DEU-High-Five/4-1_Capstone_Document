require("dotenv").config();

var express = require('express');
var router = express.Router();


const jwt = require("jsonwebtoken");
const connection = require('../mariadb');


router.get('/', function(req, res) {
    let authHeader = req.headers["authorization"];
    let accessToken = authHeader && authHeader.split(" ")[1];

    let q1 = "SELECT m.BOARD_NUM, m.TITLE, m.BOARD_MAX, COUNT(*) AS HEAD_COUNT "
    q1 += "FROM matching_board m, board_member b WHERE m.BOARD_NUM = b.BOARD_NUM AND UPLOADER_ID = ? AND BOARD_CATEGORY = 1 AND b.ACCEPTED = 1 "
    q1 += "GROUP BY m.BOARD_NUM ORDER BY m.CREATED_AT DESC; "

    let q2 = "SELECT m.BOARD_NUM, m.TITLE, m.BOARD_MAX, COUNT(*) AS HEAD_COUNT "
    q2 += "FROM matching_board m, board_member b WHERE m.BOARD_NUM = b.BOARD_NUM AND UPLOADER_ID = ? AND BOARD_CATEGORY = 2 AND b.ACCEPTED = 1 "
    q2 += "GROUP BY m.BOARD_NUM ORDER BY m.CREATED_AT DESC; "

    let q3 = "SELECT m.BOARD_NUM, m.TITLE, m.BOARD_MAX, COUNT(*) AS HEAD_COUNT "
    q3 += "FROM matching_board m, board_member b WHERE m.BOARD_NUM = b.BOARD_NUM AND UPLOADER_ID = ? AND BOARD_CATEGORY = 3 AND b.ACCEPTED = 1 "
    q3 += "GROUP BY m.BOARD_NUM ORDER BY m.CREATED_AT DESC; "

    let q4 = "SELECT m.BOARD_NUM, m.TITLE, m.BOARD_MAX, COUNT(*) AS HEAD_COUNT "
    q4 += "FROM matching_board m, board_member b WHERE m.BOARD_NUM = b.BOARD_NUM AND UPLOADER_ID = ? AND BOARD_CATEGORY = 4 AND b.ACCEPTED = 1 "
    q4 += "GROUP BY m.BOARD_NUM ORDER BY m.CREATED_AT DESC; "

    let query = q1 + q2 + q3 + q4

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_KEY,
        (err, user) => {
          if(err) {
            console.log(err)
            return res.sendStatus(403);
          }
          connection.query(query, [user.Id, user.Id, user.Id, user.Id], function (err, result) {
            if (err) {
              return res.status(500)
            }
            const myPosts = {
              myMajor: { isEmpty: result[0][0] == undefined, data: result[0] },
              myUniv: { isEmpty: result[1][0] == undefined, data: result[1] },
              friends: { isEmpty: result[2][0] == undefined, data: result[2] },
              club: { isEmpty: result[3][0] == undefined, data: result[3] }
            }
            return res.status(200).json({
              myPosts
            })
        });
    });
  });

router.get('/apply/recv', function(req, res) {
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
      let q1 = "SELECT m.BOARD_NUM, m.BOARD_CATEGORY, m.TITLE, b.MEMBER_NUM, b.USER_ID, b.USER_NICKNAME "
      q1 += "FROM matching_board m, board_member b WHERE m.BOARD_NUM = b.BOARD_NUM AND m.UPLOADER_ID = ? AND b.ACCEPTED = 0 "
      q1 += "ORDER BY b.CREATED_AT DESC; "

      let q2 = "SELECT b.ACCEPTED, m.BOARD_NUM, m.BOARD_CATEGORY, m.TITLE, b.MEMBER_NUM, b.USER_ID, b.USER_NICKNAME "
      q2 += "FROM matching_board m, board_member b WHERE m.BOARD_NUM = b.BOARD_NUM AND m.UPLOADER_ID = ? AND b.USER_ID != ? AND b.ACCEPTED != 0 "
      q2 += "ORDER BY b.UPDATED_AT DESC; "
      connection.query(q1 + q2, [user.Id, user.Id, user.Id], function (err, result) {
        if (err) {
          return res.status(500)
        }
        return res.status(200).json({
          isEmpty1: (result[0][0] == undefined),
          isEmpty2: (result[1][0] == undefined),
          waiting: result[0],
          determined: result[1]
        })
      });
    });
});

router.post('/apply/recv', function(req, res) {
  const data = {
    target_num: req.body.target_num,
    state: req.body.state,
  };
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
      if(data.state == 2){
        let q2 = "UPDATE board_member SET ACCEPTED = ?, UPDATED_AT = now() WHERE MEMBER_NUM = ?"
        connection.query(q2, [data.state, data.target_num], function (err2, result2) {
          if (err2) {
            return res.status(500)
          }
          return res.status(200).json({isFull: false})
        })
      }
      else {
        let q1 = "SELECT COUNT(*) AS ISFULL FROM matching_board "
        q1 += "WHERE BOARD_NUM = ? AND BOARD_MAX = (SELECT COUNT(*) FROM board_member WHERE BOARD_NUM = ? AND ACCEPTED = 1);"
        connection.query(q1, [data.target_num, data.target_num], function (err, result) {
          if (err) {
            return res.status(500)
          }
          if(result[0].ISFULL){
            return res.status(200).json({isFull: true})
          }
          let q2 = "UPDATE board_member SET ACCEPTED = ?, UPDATED_AT = now() WHERE MEMBER_NUM = ?"
          connection.query(q2, [data.state, data.target_num], function (err2, result2) {
            if (err2) {
              return res.status(500)
            }
            return res.status(200).json({isFull: false})
          })
        });
      }
    });
});




router.get('/apply/send', function(req, res) {
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
      let q1 = "SELECT m.BOARD_NUM, m.BOARD_CATEGORY, m.TITLE, b.MEMBER_NUM "
      q1 += "FROM matching_board m, board_member b WHERE m.BOARD_NUM = b.BOARD_NUM AND b.USER_ID = ? AND b.ACCEPTED = 0 "
      q1 += "ORDER BY b.CREATED_AT DESC; "

      let q2 = "SELECT b.ACCEPTED, m.BOARD_NUM, m.BOARD_CATEGORY, m.TITLE, b.MEMBER_NUM "
      q2 += "FROM matching_board m, board_member b WHERE m.BOARD_NUM = b.BOARD_NUM AND b.USER_ID = ? AND m.UPLOADER_ID != ? AND b.ACCEPTED != 0 "
      q2 += "ORDER BY b.UPDATED_AT DESC; "
      connection.query(q1 + q2, [user.Id, user.Id, user.Id], function (err, result) {
        if (err) {
          return res.status(500)
        }
        return res.status(200).json({
          isEmpty1: (result[0][0] == undefined),
          isEmpty2: (result[1][0] == undefined),
          waiting: result[0],
          determined: result[1]
        })
      });
    });
});


module.exports = router;