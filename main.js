var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = new URL("http://localhost:3000" + _url).searchParams;
  var pathname = new URL("http://localhost:3000" + _url).pathname;

  console.log(new URL("http://localhost:3000" + _url));
  if (pathname === "/") {
    if (queryData.get("id") === null) {
      fs.readdir("./data", (err, fileList) => {
        console.log(fileList);
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = "<ul>";

        // 게시글 리스트 출력 파트
        var i = 0;
        while (i < fileList.length) {
          list =
            list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
          i = i + 1;
        }
        list = list + "</ul>";

        var template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
            </body>
            </html>
            `;
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", (err, fileList) => {
        console.log(fileList);
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = "<ul>";

        // 게시글 리스트 출력 파트
        var i = 0;
        while (i < fileList.length) {
          list =
            list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
          i = i + 1;
        }
        list = list + "</ul>";
        fs.readFile(
          `data/${queryData.get("id")}`,
          "utf8",
          (err, description) => {
            var title = queryData.get("id");
            var template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>
                `;
            response.writeHead(200);
            response.end(template);
          }
        );
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
