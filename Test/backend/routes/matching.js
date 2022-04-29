require("dotenv").config();

var express = require('express');
var router = express.Router();

const connection = require('../mariadb');

const jwt = require("jsonwebtoken");

function set_values(row) {
  let value = {
    num: '',
    category: '',
    major: '',
    univ: '',
    title: '',
    subTitle: ''
  }
  if (row[0] != undefined){
    value.num = row[0].BOARD_NUM
    value.category = row[0].BOARD_CATEGORY
    value.major = row[0].BOARD_MAJOR
    value.univ = row[0].BOARD_UNIV
    value.title = row[0].TITLE
    value.subTitle = row[0].SUB_TITLE
  }
  return value
}

router.post('/', function(req, res) {
  const user = {
    univ: req.body.user_univ,
    major: req.body.user_major,
  };
  let q1 = "SELECT BOARD_NUM, BOARD_CATEGORY, BOARD_MAJOR, BOARD_UNIV, SUB_TITLE, TITLE "
  q1 += "FROM matching_board WHERE BOARD_UNIV = '" + user.univ + "' AND BOARD_MAJOR = '" + user.major + "' AND BOARD_CATEGORY = 1 "
  q1 += "ORDER BY CREATED_AT DESC LIMIT 1; "
  
  let q2 = "SELECT BOARD_NUM, BOARD_CATEGORY, BOARD_MAJOR, BOARD_UNIV, SUB_TITLE, TITLE "
  q2 += "FROM matching_board WHERE BOARD_UNIV = '" + user.univ + "' AND BOARD_CATEGORY = 2 "
  q2 += "ORDER BY CREATED_AT DESC LIMIT 1; "
  
  let q3 = "SELECT BOARD_NUM, BOARD_CATEGORY, BOARD_MAJOR, BOARD_UNIV, SUB_TITLE, TITLE "
  q3 += "FROM matching_board WHERE BOARD_UNIV = '" + user.univ + "' AND BOARD_MAJOR = '" + user.major + "' AND BOARD_CATEGORY = 3 "
  q3 += "ORDER BY CREATED_AT DESC LIMIT 1; "
  
  let q4 = "SELECT BOARD_NUM, BOARD_CATEGORY, BOARD_MAJOR, BOARD_UNIV, SUB_TITLE, TITLE "
  q4 += "FROM matching_board WHERE BOARD_UNIV = '" + user.univ + "' AND BOARD_MAJOR = '" + user.major + "' AND BOARD_CATEGORY = 4 "
  q4 += "ORDER BY CREATED_AT DESC LIMIT 1; "
  
  //let query = "SELECT BOARD_NUM, BOARD_CATEGORY, BOARD_MAJOR, BOARD_UNIV, SUB_TITLE, TITLE FROM(SELECT * FROM matching_board WHERE (BOARD_CATEGORY, CREATED_AT) IN (SELECT BOARD_CATEGORY, MAX(CREATED_AT) AS DATE FROM matching_board GROUP BY BOARD_CATEGORY) ORDER BY CREATED_AT DESC) t GROUP BY t.BOARD_CATEGORY"
  
  let query = q1 + q2 + q3 + q4

  connection.query(query, function (err, result) {
    if (err) {
      throw err;
    }
    const posts = {
      myMajor: set_values(result[0]),
      myUniv: set_values(result[1]),
      friends: set_values(result[2]),
      club: set_values(result[3])
    }
    // let myMajor = set_values(result[0]);
    // let myUniv = set_values(result[1]);
    // let friends = set_values(result[2]);
    // let club = set_values(result[3]);

    res.json({
      posts
    })

    // else{
    //   let result = []
    //   for(var i = 0; i < 4; i++)
    //     result.push(0)
    //   for(var i = 0; i < row.length; i++){
    //     switch(row[i].BOARD_CATEGORY){
    //       case 1:
    //         result[0] = set_values(row[i])
    //         break;
    //       case 2:
    //         result[1] = set_values(row[i])
    //         break;
    //       case 3:
    //         result[2] = set_values(row[i])
    //         break;
    //       case 4:
    //         result[3] = set_values(row[i])
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    //   res.json({
    //     result
    //   })
    // }
  });
  // res.json({
  //   success: true,
  //   message: 'Uploaded'
  // })
});

// router.post('/category/view', function(req, res) {
//   if (req.body.num == undefined){
//     return res.sendStatus(400);
//   }
//   if (!Number.isInteger(req.body.num)){
//     return res.sendStatus(400);
//   }
//   let query1 = "SELECT * FROM matching_board WHERE BOARD_NUM = " + req.body.num + "; "
//   connection.query(query1, function (err, result) {
//     if (err) {
//       throw err;
//     }
//     if(result[0] == undefined){
//       return res.status(200).json({
//         isExist: false,
//       })
//     }
//     else{
//       let post = {
//         category: result[0].BOARD_CATEGORY,
//         major: result[0].BOARD_MAJOR,
//         univ: result[0].BOARD_UNIV,
//         deadline: result[0].BOARD_DEADLINE,
//         max: result[0].BOARD_MAX,
//         uploaderId: result[0].UPLOADER_ID,
//         uploaderNickname: result[0].UPLOADER_NICKNAME,
//         title: result[0].TITLE,
//         content: result[0].CONTENT,
//         createdAt: result[0].CREATED_AT,
//         tag_1: result[0].TAG_1,
//         tag_2: result[0].TAG_2,
//         tag_3: result[0].TAG_3,
//       }
//       res.status(200).json({
//         isExist: true,
//         post
//       })
//     }
//   });
// });


router.post('/category/view', function(req, res) {
  if (req.body.num == undefined){
    return res.sendStatus(400);
  }
  if (!Number.isInteger(req.body.num)){
    return res.sendStatus(400);
  }
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
      let query1 = "SELECT * FROM matching_board WHERE BOARD_NUM = ?; "
      let query2 = "SELECT COUNT(*) AS TOTAL FROM board_member WHERE BOARD_NUM = ? AND ACCEPTED = 1; "
      connection.query(query1 + query2, [req.body.num, req.body.num], function (err, result) {
        if (err) {
          throw err;
        }
        if(result[0][0] == undefined){
          // 404로 전송 시 오류 존재
          return res.status(200).json({
            isExist: false,
          })
        }
        else{
          let post = {
            category: result[0][0].BOARD_CATEGORY,
            major: result[0][0].BOARD_MAJOR,
            univ: result[0][0].BOARD_UNIV,
            deadline: result[0][0].BOARD_DEADLINE,
            max: result[0][0].BOARD_MAX,
            uploaderId: result[0][0].UPLOADER_ID,
            uploaderNickname: result[0][0].UPLOADER_NICKNAME,
            title: result[0][0].TITLE,
            content: result[0][0].CONTENT,
            createdAt: result[0][0].CREATED_AT,
            tag_1: result[0][0].TAG_1,
            tag_2: result[0][0].TAG_2,
            tag_3: result[0][0].TAG_3,
            headCount: result[1][0].TOTAL
          }

          if(!user.authorized){
            return res.status(200).json({
              auth: false,
              isLeader: false,
              post,
              isExist: true,        // isExist: 404 버그 해결 시 코드로 대체
            })
          }
          else if(user.Id == result[0][0].UPLOADER_ID){
            return res.status(200).json({
              auth: true,
              isLeader: true,
              post,
              isExist: true,
            })
          }
          else {
            return res.status(200).json({
              auth: true,
              isLeader: false,
              post,
              isExist: true,
            })
          }

          // if(user.Id != result[0].UPLOADER_ID && user.authorized){
          //   return res.status(200).json({
          //     enable: true,
          //     isExist: true,
          //     post
          //   })
          // }
          // else{
          //   return res.status(200).json({
          //     enable: false,
          //     isExist: true,
          //     post
          //   })
          // }
        }
      });
    });
  
});


router.post('/category', function(req, res) {
  
  const user = {
    category: req.body.category,
    univ: req.body.user_univ,
    major: req.body.user_major,
  };

  let params = []

  let query = "SELECT COUNT(*) AS HEAD_COUNT, m.BOARD_NUM, BOARD_CATEGORY, BOARD_MAJOR, BOARD_UNIV, TITLE, SUB_TITLE, BOARD_MAX, BOARD_DEADLINE, TAG_1, TAG_2, TAG_3"
  query += " FROM matching_board m, board_member b"
  if (user.category == 2){
    params = [user.univ, user.category]
    query += " WHERE m.BOARD_NUM = b.BOARD_NUM AND BOARD_UNIV = ? AND BOARD_CATEGORY = ? AND b.ACCEPTED = 1"
  }
  else {
    params = [user.univ, user.major, user.category]
    query += " WHERE m.BOARD_NUM = b.BOARD_NUM AND BOARD_UNIV = ? AND BOARD_MAJOR = ? AND BOARD_CATEGORY = ? AND b.ACCEPTED = 1"
  }
  query += " GROUP BY b.BOARD_NUM ORDER BY m.CREATED_AT DESC;"
  
  // let q1 = "SELECT BOARD_NUM, BOARD_CATEGORY, BOARD_MAJOR, BOARD_UNIV, TITLE, SUB_TITLE, BOARD_MAX, BOARD_DEADLINE, TAG_1, TAG_2, TAG_3 "
  // if (user.category == 2){
  //   q1 += "FROM matching_board WHERE BOARD_UNIV = '" + user.univ + "' AND BOARD_CATEGORY = " + user.category + " "
  // }else{
  //   q1 += "FROM matching_board WHERE BOARD_UNIV = '" + user.univ + "' AND BOARD_MAJOR = '" + user.major + "' AND BOARD_CATEGORY = " + user.category + " "
  // }
  // q1 += "ORDER BY CREATED_AT DESC; "
  connection.query(query, params, function (err, row) {
    if (err) {
      throw err
      //return res.sendStatus(400)
    }
    
      if (row[0] == undefined){
        res.json({
          isEmpty: true,
        })
      }
      else{
        let result = row
        res.json({
          isEmpty: false,
          result
        })
      }
    
  });
  // res.json({
  //   success: true,
  //   message: 'Uploaded'
  // })
});


function ConvertSystemSourcetoHtml(str){
  if (str !== undefined && str != null && str !== ''){
    str = String(str);
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
    str = str.replace(/\(/g,"&#40;");
    str = str.replace(/\)/g,"&#41;");
    str = str.replace(/</g,"&lt;");
    str = str.replace(/>/g,"&gt;");
    str = str.replace(/\"/g,"&quot;");
    str = str.replace(/\'/g,"&#39;");
    str = str.replace(/\n/g,"<br />");
  }
  return str;
 }

router.post('/upload', function (req, res) {    // sql 인젝션 처리 필요
  const rep_title = ConvertSystemSourcetoHtml(req.body.post_title)
  const rep_sub_title = ConvertSystemSourcetoHtml(req.body.post_sub_title)
  const rep_content = ConvertSystemSourcetoHtml(req.body.post_content)
  
  const post = {
    univ: req.body.post_univ,
    major: req.body.post_major,
    category: req.body.post_category,
    deadline: req.body.post_deadline,
    max: req.body.post_head_count_max,
    userId: req.body.userId,
    userNickname: req.body.userNickname,
    title: rep_title,
    subTitle: rep_sub_title,
    tag_1: req.body.post_tag_1,
    tag_2: req.body.post_tag_2,
    tag_3: req.body.post_tag_3,
    content: rep_content,
  };
  
  let query1 = "INSERT INTO matching_board(BOARD_UNIV, BOARD_MAJOR, BOARD_CATEGORY, BOARD_DEADLINE, BOARD_MAX, UPLOADER_ID, UPLOADER_NICKNAME, TITLE, SUB_TITLE, TAG_1, TAG_2, TAG_3 ,CONTENT) VALUES ("
  query1 += '"' + post.univ + '", '
  query1 += '"' + post.major + '", '
  query1 += '"' + post.category + '", '
  query1 += '"' + post.deadline + '", '
  query1 += '"' + post.max + '", '
  query1 += '"' + post.userId + '", '
  query1 += '"' + post.userNickname + '", '
  query1 += '"' + post.title + '", '
  query1 += '"' + post.subTitle + '", '

  if(post.tag_1 != ''){
    query1 += '"' + post.tag_1 + '", '
  }
  else {
    query1 += 'NULL, '
  }
  if(post.tag_2 != ''){
    query1 += '"' + post.tag_2 + '", '
  }
  else {
    query1 += 'NULL, '
  }
  if(post.tag_3 != ''){
    query1 += '"' + post.tag_3 + '", '
  }
  else {
    query1 += 'NULL, '
  }
  query1 += '"' + post.content + '"); '

  connection.query(query1, function (err, result) {
    if (err) {
      throw err;
    }
    let q1 = "SELECT LAST_INSERT_ID() AS LAST; "
    
    connection.query(q1, function (err, row) {
      if (err) {
        throw err;
      }
      let q2 = "INSERT INTO board_member(BOARD_NUM, USER_ID, USER_NICKNAME, ACCEPTED) VALUES (?, ?, ?, 1)"
      let params = [row[0].LAST, post.userId, post.userNickname]
      connection.query(q2, params, function (err2, row2) {
        if (err2) {
          throw err2;
        }
      });
      return res.status(200).json({success: true, target: row[0].LAST})
    });
  });
  // res.json({
  //   success: true,
  //   message: 'Uploaded'
  // })
});

router.post('/comment', function (req, res) {
  const post = {
    board_num: req.body.board_num,
    comment: req.body.comment,
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
      if(!user.authorized){
        return res.status(200).json({success: false, auth: false});
      }
      let query1 = "INSERT INTO board_comment(BOARD_NUM, USER_ID, USER_NICKNAME, CONTENT) VALUES ("
      query1 += post.board_num + ', '
      query1 += '"' + user.Id + '", '
      query1 += '"' + user.Nickname + '", '
      query1 += '"' + post.comment + '"); '
      connection.query(query1, function (err, row) {
        if (err) {
          return res.status(500).json({success: false, auth: true});
        }
        return res.status(200).json({success: true, auth: true})
      });
    });
});


router.get('/comment/:board', function (req, res) {
  let board_num = req.params.board
  let query = "SELECT * FROM board_comment WHERE BOARD_NUM = " + board_num + " ORDER BY CREATED_AT DESC;"
  connection.query(query, function (err, row) {
    if (err) {
      return res.sendStatus(500);
    }
    if (row[0] == undefined){
      return res.status(200).json({isEmpty: true})
    }
    return res.status(200).json({isEmpty: false, result: row})
  });
});

router.post('/apply', function (req, res) {
  let board_num = req.body.board_num
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
      if(!user.authorized){
        return res.status(200).json({success: false, auth: false});
      }
      let query1 = "INSERT INTO board_member(BOARD_NUM, USER_ID, USER_NICKNAME) VALUES ("
      query1 += board_num + ', '
      query1 += '"' + user.Id + '", '
      query1 += '"' + user.Nickname + '"); '
      connection.query(query1, function (err, row) {
        if (err) {
          console.log(err)
          return res.status(200).json({success: false, auth: true}); 
          //status 전송 오류 해결 시 500으로 대체
        }
        return res.status(200).json({success: true, auth: true})
      });
    });
});

router.get('/apply/:board', function (req, res) {
  let board_num = req.params.board
  let authHeader = req.headers["authorization"];
  let accessToken = authHeader && authHeader.split(" ")[1];

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY,
    (err, user) => {
      if(err) {
        return res.sendStatus(403);
      }
      if(!user.authorized){
        return res.status(200).json({success: false, auth: false});
      }
      let query = "SELECT ACCEPTED FROM board_member WHERE BOARD_NUM = ? AND USER_ID = ?"
      connection.query(query, [board_num, user.Id], function (err, row) {
        if (err) {
          console.log(err)
          return res.sendStatus(500);
        }
        if (row[0] == undefined){
          return res.status(200).json({success: true, applied: false})
        }
        return res.status(200).json({success: true, applied: true, accepted: row[0].ACCEPTED})
      });
    });
});


router.get('/home', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
