'use strict';
const express = require(`express`);
const app = express();
app.use(express.json());

const fs = require(`fs`).promises;
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

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.send([]);
  }
});

app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

module.exports = {
  start(userPort) {
    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.log(red(err));
      }
      return console.info(green(`Ожидаю соединений на ${port}`));
    });
  }
};
