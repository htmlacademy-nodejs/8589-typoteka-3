'use strict';

const express = require(`express`);
const path = require(`path`);
const rootRoutes = require(`./routes/root`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);

const PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();
app.use(express.json());
app.use(`/`, rootRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use((req, res) => res.status(500).render(`errors/500`));
app.use((req, res) => res.status(400).render(`errors/400`));


app.listen(PORT);
