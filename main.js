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
      var title = "Welcome";
      var description = "Hello, Node.js";
      var template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
        </body>
        </html>
        `;
      response.writeHead(200);
      response.end(template);
    } else {
      fs.readFile(`data/${queryData.get("id")}`, "utf8", (err, description) => {
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
            <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${description}</p>
            </body>
            </html>
            `;
        response.writeHead(200);
        response.end(template);
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
