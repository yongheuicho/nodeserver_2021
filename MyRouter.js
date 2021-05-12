const fs = require('fs');
const myHandler = require('./MyHandler');

function route(pathname, handle, res, postData) {
  console.log('Routing request for ' + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, postData);
  } else {
    pathFile = '.' + pathname + '.html'; // ex) ./page.html
    if (fs.existsSync(pathFile)) {
      console.log(pathFile + ' is found.');
      myHandler.htmlFile(res, pathFile);
    } else {
      console.log('No handler for ' + pathname);
      let body = '404 Not Found';
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write(body);
      res.end();
    }
  }
}

exports.route = route;
