require("dotenv").config();

var express = require('express');
var router = express.Router();

const connection = require('../mariadb');

const jwt = require("jsonwebtoken");

/*
Math.random().toString(36).substring(2, 10);
*/

router.get('/home', function(req, res) {
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
      let query1 = "SELECT group_code, group_name, group_info FROM group_list WHERE group_code = (SELECT group_code FROM group_member WHERE user_id = ? AND user_state = 1); "
      let query2 = "SELECT group_code, group_name, group_info FROM group_list WHERE group_code = (SELECT group_code FROM group_member WHERE user_id = ? AND user_state = 0); "
      connection.query(query1 + query2, [user.id, user.id], function (err, result) {
        if (err) {
          throw err;
        }
        
        let group_list = {
          manage: result[0],
          affiliation: result[1]
        }
        
        return res.status(200).json({
          group_list
        })
    });
  });
});

function checkDuplicates(temp_code){
  let flag = false;
  var self = this;
  let query = "SELECT COUNT(*) as cnt FROM group_list WHERE group_code = ?; "
  connection.query(query, temp_code, function (err, result) {
    if (err) {
      throw err;
    }
    console.log(aas)
    if (result[0].cnt == 0) self.flag = true;
    else self.flag = true;
  });  
  console.log(flag)
}

router.post('/create', function(req, res) {
  console.log("create")
  let authHeader = req.headers["authorization"];
  let accessToken = authHeader && authHeader.split(" ")[1];

  const group_info = {
    name : req.body.groupName,
    description : req.body.groupDescription
  }
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY,
    (err, user) => {
      if(err) {
        console.log(err)
        return res.sendStatus(403);
      }

      let flag = false;
      let group_code_temp = 'yg3hxtcd';

      console.log(checkDuplicates(group_code_temp));
      // while (!flag){
      //   group_code_temp = Math.random().toString(36).substring(2, 10);
      //   if (!checkDuplicates(group_code_temp)) flag = true;
      // }
      group_code_temp = Math.random().toString(36).substring(2, 10);
      console.log(checkDuplicates(group_code_temp));
      let query2 = "INSERT INTO group_list(group_code, group_name, group_info) VALUES(?, ?, ?);"
      let params = [group_code_temp, group_info.name, group_info.description]
      connection.query(query2, params, function (err, result) {
        if (err) {
          throw err;
        }
        return res.status(200).json({success: true, target: group_code_temp});
      });
    })
  });


module.exports = router;
