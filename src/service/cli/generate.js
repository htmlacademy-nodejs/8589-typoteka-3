'use strict';

const fs = require(`fs`).promises;
const {red, green} = require(`chalk`);

const {
  PROCESS_CODES,
  getRandomInt,
  getRandomIndexFromArray,
  shuffle,
  getRandomDateBeforeDate
} = require(`../../utils`);

const GENERATE_AMOUNT = {
  MIN: 1,
  MAX: 100,
  ANNOUNCEMENT_MAX_LENGTH: 5,
};

const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const TEXTS = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const createArticleObject = () => {
  return {
    title: `${getRandomIndexFromArray(TITLES)}`,
    createdDate: `${getRandomDateBeforeDate()}`,
    announce: `${shuffle(TEXTS).slice(0, GENERATE_AMOUNT.ANNOUNCEMENT_MAX_LENGTH).join(` `)}`,
    fullText: `${shuffle(TEXTS).splice(getRandomInt(1, TEXTS.length - 1), getRandomInt(1, TEXTS.length - 1)).join(` `)}`,
    сategory: `${shuffle(CATEGORIES).slice(0, getRandomInt(1, TEXTS.length - 1)).join(`, `)}`,
  };
};

const generateData = async (count = null) => {
  let articlesCount = Number.parseInt(count, 10) || GENERATE_AMOUNT.MIN;
  if (articlesCount > 1000) {
    console.log(red(`Not more that 1000 elements`));
    process.exit(1);
  }
  if (articlesCount === 0) {
    articlesCount = GENERATE_AMOUNT.MIN;
  }
  const data = JSON.stringify(Array.from({length: articlesCount}, createArticleObject));
  try {
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
