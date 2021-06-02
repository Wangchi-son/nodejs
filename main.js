var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

function templateHTML(title, list, body, control) {
  return `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB2</a></h1>
    ${list}
    ${control}
    ${body}
    </body>
    </html>
    `;
}
function templateList(fileList) {
  var list = "<ul>";

  // 게시글 리스트 출력 파트
  var i = 0;
  while (i < fileList.length) {
    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    i = i + 1;
  }
  list = list + "</ul>";
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = new URL("http://localhost:3000" + _url).searchParams;
  var pathname = new URL("http://localhost:3000" + _url).pathname;
  if (pathname === "/") {
    if (queryData.get("id") === null) {
      fs.readdir("./data", (err, fileList) => {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = templateList(fileList);

        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", (err, fileList) => {
        fs.readFile(
          `data/${queryData.get("id")}`,
          "utf8",
          (err, description) => {
            var title = queryData.get("id");
            var list = templateList(fileList);
            var template = templateHTML(
              title,
              list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
            response.writeHead(200);
            response.end(template);
          }
        );
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", (err, fileList) => {
      var title = "WEB - create";
      var list = templateList(fileList);

      var template = templateHTML(
        title,
        list,
        `
        <form action="/create_process" method="POST">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description" ></textarea></p>
            <p><input type="submit"></p>
        </form>
        `,
        ""
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", (data) => {
      body = body + data;
    });
    request.on("end", () => {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      console.log(post.title);
    });
    response.writeHead(200);
    response.end("success");
  } else if (pathname === "/update") {
    fs.readdir("./data", (err, fileList) => {
      fs.readFile(`data/${queryData.get("id")}`, "utf8", (err, description) => {
        var title = queryData.get("id");
        var list = templateList(fileList);
        var template = templateHTML(
          title,
          list,
          `
          <form action="/update_process" method="POST">
          <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p><textarea name="description" placeholder="description" >${description}</textarea></p>
            <p><input type="submit"></p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
