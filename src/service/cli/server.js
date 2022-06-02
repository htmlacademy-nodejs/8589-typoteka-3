'use strict';

const fs = require(`fs`).promises;
const http = require(`http`);
const {red, green} = require(`chalk`);

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME).then((text) => JSON.parse(text));
        const titles = fileContent.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${titles}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
        console.log(red(err));
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      console.log(red(`Use index "/" page please`));
      break;
  }
};

module.exports = {
  start(userPort) {
    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;
    http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, () => {
      console.info(green(`Ожидаю соединений на ${port}`));
    })
    .on(`error`, ({message}) => {
      console.log(red(`Ошибка при создании сервера: ${message}`));
    });
  }
};
