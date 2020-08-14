const express =  require('express');
const db = require("../db");
const router = express.Router();

/**
 * /login 验证登录
 * GET
 * @param {String} username 用户名
 * @param {String} password 用户密码
 */
router.get('/login', (reg,res) => {
    const {username, password} = reg.query;
    if (!username || !password) {
        res.json({err: 1, msg: '用户名和密码都不能为空'})
        return;
    }
    const sql = `SELECT * FROM user Where user = '${username}' and password = '${password}'`;
    db.query(sql,[],function(result, field){
        console.log(result);
        if (!result.length) {
            console.log(1111)
            res.json({err: 1, msg: '用户名不存在'})
            return;
        }
        if (result[0].password != password) {
            console.log(22222)
            res.json({ err: 1, msg: '密码不正确'})
            return;
        }
        res.json({
            err: 0,
            msg: '登录成功'
        })
    })
});

/**
 * /reg 验证注册
 * POST
 * @param {String} username 用户名
 * @param {String} password 用户密码
 */
router.post('/reg', (reg,res) => {
    let {username,password} = reg.body;
    if (!username || !password) {
        res.json({err: 1, msg: '用户名和密码都不能为空'})
        return;
    }
    const sql = `INSERT INTO user (user, password) VALUES ('${username}', '${password}')`;
    db.query(sql,[],function(result){
        res.json({ err: 0, msg: '注册成功'});
    })
});

module.exports = router;