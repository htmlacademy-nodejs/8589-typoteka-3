'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/`, (req, res) => res.send(`/articles`));
articlesRouter.get(`/add`, (req, res) => res.send(`/articles/add`));
articlesRouter.get(`/:id`, (req, res) => res.send(`/articles/${req.params.id}`));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/${req.params.id}`));
articlesRouter.get(`/category/:id`, (req, res) => res.send(`/articles/category/${req.params.id}`));

module.exports = articlesRouter;
