'use strict';

const express = require(`express`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);

const app = express();
app.use(express.json());
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

const port = 8080;

app.get(`/`, (req, res) => {
  res.send(`/`);
});

app.get(`/register`, (req, res) => {
  res.send(`/register`);
});

app.get(`/login`, (req, res) => {
  res.send(`/login`);
});

app.get(`/search`, (req, res) => {
  res.send(`/search`);
});


app.listen(port);
