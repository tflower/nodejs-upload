// const http = require('http');
// var querystring = require('querystring');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.setHeader('charset', 'utf8');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     req.setEncoding('utf-8');
//     var postData = '';
//     // 注册监听, 接收数据块
//     req.addListener("data", function (postDataChunk) {
//         postData += postDataChunk;
//     });
//     // 数据接收完毕, 执行回调函数
//     req.addListener("end", function () {
//       var params = querystring.parse(postData);  //解析 HEADER 中的数据
//       console.log(params);
//       res.writeHead(200, {'Content-Type': 'multipart/form-data'});
//       res.end('Hello World\n');
//       res.statusCode = 200;
      
//       res.end('data-img')
//     });
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


//express
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
// var upload = multer({ dest: './images/' }); // for parsing multipart/form-data
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // modified here  or user file.mimetype
    }
  })
  
  var upload = multer({ storage: storage }).single('file');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/', function (req, res) {
    upload(req,res,function(err){
        console.log(req.file)
        console.log(req.body)
        res.set({
            'Content-Type': 'text/plain',
            'Content-Length': '123',
            'ETag': '12345',
            'Access-Control-Allow-Origin':'*'
        });
        res.json(req.body);
    })
    
    
   
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});




// const http = require('http');
// const fs = require('fs');
// const util = require('util');
// const querystring =require('querystring');

// //用http模块创建一个http服务端
// http.createServer(function(req, res) {
//       parseFile(req, res)
//     //   console.log(req)
// }).listen(3000);

// function parseFile (req, res) {
//   req.setEncoding('binary');
//   var body = '';   // 文件数据
//   var fileName = '';  // 文件名
//   // 边界字符串
// //   console.log(req.headers['content-type'])
//   var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=','');
//   req.on('data', function(chunk){
//     body += chunk;
//   });

//   req.on('end', function() {
//     var file = querystring.parse(body, '\r\n', ':')
// // console.log(file)
//     // 只处理图片文件
//     if (file['Content-Type'].indexOf("image") !== -1)
//     {
//       //获取文件名
//       var fileInfo = file['Content-Disposition'].split('; ');
//       for (value in fileInfo){
//         if (fileInfo[value].indexOf("filename=") != -1){
//           fileName = fileInfo[value].substring(10, fileInfo[value].length-1);

//           if (fileName.indexOf('\\') != -1){
//             fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
//           }
//           console.log("文件名: " + fileName);
//         }
//       }

//       // 获取图片类型(如：image/gif 或 image/png))
//       var entireData = body.toString();
//       var contentTypeRegex = /Content-Type: image\/.*/;

//       contentType = file['Content-Type'].substring(1);

//       //获取文件二进制数据开始位置，即contentType的结尾
//       var upperBoundary = entireData.indexOf(contentType) + contentType.length;
//       var shorterData = entireData.substring(upperBoundary);

//       // 替换开始位置的空格
//       var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

//       // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
//       var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--'+boundary+'--'));
// console.log(binaryData)
//       // 保存文件
//       fs.writeFile(fileName, binaryData, 'binary', function(err) {
//         res.end('4444444444444');
//       });
//     } else {
//       res.end('只能上传图片文件');
//     }
//   });
// }
