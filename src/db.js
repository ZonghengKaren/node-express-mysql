const mysql = require('mysql');
const dbConfig = require('./db.config');

module.exports = {
    query : function(sql,params,callback){
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        let connection = mysql.createConnection(dbConfig);
        connection.connect(function(err){
            if(err){
                console.log('数据库链接失败');
                throw err;
            }
            //开始数据操作
            connection.query( sql, params, function(err,result,field ){
                if(err){
                    console.log('数据操作失败');
                    throw err;
                }
                callback && callback(JSON.parse(JSON.stringify(result)));
                //results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
                //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                connection.end(function(err){
                    if(err){
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    }
};