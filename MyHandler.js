const fs = require('fs');

function start(res) {
  let body = '<head><meta charset ="UTF-8"/></head>';
  body += '<body><div>Hello, world! <br> I am in the cloud class.</div><br>';
  body += '<div><a href="/hello">hello 페이지</a></div>';
  body += '<div><a href="/wait">5초 대기 페이지</a></div>';
  body += '<div><a href="/randomWait">무작위 대기 페이지</a></div>';
  body += '<div><a href="/firstHtml">HTML 읽는 페이지</a></div>';
  body += '</body>';
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

function hello(res) {
  let body = 'This is my first web server.';
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

function wait(res) {
  setTimeout(function () {
    let body = 'Thank you for waiting for 5 seconds.';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(body);
    res.end();
  }, 5000);
}

function randomWait(res) {
  let waitTime = Math.round(Math.random() * 10000);
  setTimeout(function () {
    let body = 'Thank you for waiting for ' + waitTime + ' ms.';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(body);
    res.end();
  }, waitTime);
}

function htmlFile(res, file) {
  body = fs.readFileSync(file, 'utf-8');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

function firstHtml(res) {
  htmlFile(res, './firstHtml.html');
}

exports.start = start;
exports.hello = hello;
exports.wait = wait;
exports.randomWait = randomWait;
exports.firstHtml = firstHtml;
