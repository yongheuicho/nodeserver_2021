const fs = require('fs');
const os = require('os');
const queryString = require('querystring');

function start(res) {
  let body = '<head><meta charset ="UTF-8"/></head>';
  body += '<body><div>Hello, world! <br> I am in the cloud class.</div><br>';
  body += '<div><a href="/hello">hello 페이지</a></div>';
  body += '<div><a href="/wait">5초 대기 페이지</a></div>';
  body += '<div><a href="/randomWait">무작위 대기 페이지</a></div>';
  body += '<div><a href="/firstHtml">HTML 읽는 페이지</a></div>';
  body +=
    '<div><a href="/page">Handler 없이 "/page"로 매핑하는 페이지</a></div>';
  body += '<div><a href="/serverInfo">Server 정보를 표시하는 페이지</a></div>';
  body += '<div><a href="/form">Form 입력 페이지</a></div>';
  body +=
    '<div><a href="/nickname">Form으로 넘어온 이름과 별명 표시 페이지</a></div>';
  body +=
    '<div><a href="/people">JSON을 입력받아 사람 정보를 표시하는 페이지</a></div>';
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

function serverInfo(res) {
  info = JSON.stringify(os.cpus());
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(info);
  res.end();
}

function nickname(res, postData) {
  let body = '<head><meta charset ="UTF-8"/></head>';
  body +=
    '<div>안녕하세요, ' + queryString.parse(postData).myName + '님.</div>';
  body +=
    '<div>당신의 별명은 ' +
    queryString.parse(postData).myNick +
    '입니다.</div>';
  body += '</body>';
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

function people(res) {
  str = fs.readFileSync('people.json', 'utf-8');
  obj = JSON.parse(str);
  console.log(obj.name + ': ' + obj.house);
  body =
    '<table><thead><tr><th>name</th><th>house</th></tr></thead><tbody><tr><td>' +
    obj.name +
    '</td><td>' +
    obj.house +
    '</td></tr></tbody></table>';
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

exports.start = start;
exports.hello = hello;
exports.wait = wait;
exports.randomWait = randomWait;
exports.firstHtml = firstHtml;
exports.htmlFile = htmlFile;
exports.serverInfo = serverInfo;
exports.nickname = nickname;
exports.people = people;
