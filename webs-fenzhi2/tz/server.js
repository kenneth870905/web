/*
npm install express
npm install request
node server.js
*/
var express = require('express');
var request = require('request');
var app = express();

app.all('*', function (req, res, next) {
                                                // 这个地方是必填的
    res.header('Access-Control-Allow-Origin', 'http://10.10.27.129:5501');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
        //让options请求快速返回
    }
    else {
        next();
    }
});

app.use('/api', function (req, res) {
    console.log(req.url);
    // console.log(res)
    // console.log(res)
    var url = 'http://10.10.27.39:789' + req.url;
    req.pipe(request(url)).pipe(res);
});
app.use('/', function (req, res) {
    res.send('<h1>ceshi</h1>')
})
app.listen(3001, function () {
    console.log(' 3001 端口')
});

// http://10.10.27.129:5501/tzGame.html  访问地址