module.exports = {
  HTML: function (title, list, body, control) {
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
  },
  list: function (fileList) {
    var list = "<ul>";

    // 게시글 리스트 출력 파트
    var i = 0;
    while (i < fileList.length) {
      list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
      i = i + 1;
    }
    list = list + "</ul>";
    return list;
  },
};
