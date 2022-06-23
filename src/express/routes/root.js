'use strict';

const {Router} = require(`express`);
const rootRoutes = new Router();

rootRoutes.get(`/`, (req, res) => res.render(`pages/index`));

rootRoutes.get(`/register`, (req, res) => res.render(`pages/sign-up`));

rootRoutes.get(`/login`, (req, res) => res.render(`pages/login`));

rootRoutes.get(`/search`, (req, res) => res.render(`pages/search`));

module.exports = rootRoutes;
