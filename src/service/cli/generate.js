'use strict';

const fs = require(`fs`).promises;
const {red, green} = require(`chalk`);
const {
  PROCESS_CODES,
  getRandomInt,
  getRandomIndexFromArray,
  shuffle,
  getRandomDateBeforeDate,
  readContent
} = require(`../../utils`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_NAME = `mocks.json`;

const GENERATE_AMOUNT = {
  MIN: 1,
  MAX: 1000,
  ANNOUNCEMENT_MAX_LENGTH: 5,
};

const createArticleObject = (titles, categories, texts) => {
  return {
    title: `${getRandomIndexFromArray(titles)}`,
    createdDate: `${getRandomDateBeforeDate()}`,
    announce: `${shuffle(texts).slice(0, GENERATE_AMOUNT.ANNOUNCEMENT_MAX_LENGTH).join(` `)}`,
    fullText: `${shuffle(texts).splice(getRandomInt(1, texts.length - 1), getRandomInt(1, texts.length - 1)).join(` `)}`,
    сategory: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
  };
};

const generateData = async (count = null) => {
  let articlesCount = Number.parseInt(count, 10) || GENERATE_AMOUNT.MIN;
  if (articlesCount > GENERATE_AMOUNT.MAX) {
    console.log(red(`Not more that ${GENERATE_AMOUNT.MAX} elements`));
    process.exit(1);
  }
  if (articlesCount === 0) {
    articlesCount = GENERATE_AMOUNT.MIN;
  }

  try {
    const [titles, categories, texts] = await Promise.all([readContent(FILE_TITLES_PATH), readContent(FILE_CATEGORIES_PATH), readContent(FILE_SENTENCES_PATH)]);
    const data = JSON.stringify(Array.from({length: articlesCount}, createArticleObject.bind(null, titles, categories, texts)));
    await fs.writeFile(FILE_NAME, data);
    console.log(green(`Operation success. File was created.`));
    process.exit(PROCESS_CODES.SUCCESS);
  } catch (error) {
    console.log(red(`Can't write data to file...`));
    process.exit(PROCESS_CODES.ERROR);
  }
};

module.exports = {
  start(count) {
    generateData(count);
  }
};
