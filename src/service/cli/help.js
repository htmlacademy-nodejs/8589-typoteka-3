'use strict';
const {grey} = require(`chalk`);

const getHelpInfo = () => {
  const text = `
    Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json

  `;
  console.log(grey(text));
};

module.exports = {
  start() {
    getHelpInfo();
  }
};
