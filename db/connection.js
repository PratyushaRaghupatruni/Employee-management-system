'use strict' ;
const util=require('util');
const mysql=require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'pratyushakamal',
    database:'employee_db'
});

connection.connect();
connection.query=util.promisify(connection.query);
module.exports=connection;