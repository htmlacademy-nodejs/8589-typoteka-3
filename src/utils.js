'use strict';

const fs = require(`fs`).promises;
const {red} = require(`chalk`);

const PROCESS_CODES = {
  ERROR: 1,
  SUCCESS: 0
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomIndexFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex = null;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const getRandomDateBeforeDate = (start = new Date(), days = 90) => {
  return new Date(start.getTime() - (Math.random() * days * 24 * 60 * 60 * 1000));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(red(err));
    return [];
  }
};

module.exports = {
  PROCESS_CODES,
  getRandomInt,
  getRandomIndexFromArray,
  shuffle,
  getRandomDateBeforeDate,
  readContent
};
