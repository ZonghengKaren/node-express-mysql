const express =  require('express');
const router = express.Router();
const db = require("../db");

router.get('/list', (reg,res) => {
    const sql = `SELECT * FROM user`;
    db.query(sql,[],function(result, field){
        res.json({
            err: 0,
            list: result
        })
    })
});
module.exports = router;