var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// route select all article
router.get('/articles', async function (req, res, next) {
  const { take } = req.params.take;
  const { skip } = req.params.skip;
  const articles = await prisma.article.findMany({ take: +take, skip: +skip });
  //const articles = await prisma.article.findMany({take:+take,skip:+skip , include :{categorie : true }});
  res.send(articles);
});

// route select unique article
router.get('/article/:id', async function (req, res, next) {
  const { id } = req.params.id;
  const article = await prisma.article.findUnique({ where: { id: +id } });
  if (!article) res.status(404).send("Not Found")
  res.send(article);
});

// route add article
router.post('/article', async function (req, res, next) {
  const data = req.body
  const article = await prisma.article.create({ data });
  res.send(article);
});

// route update article
router.patch('/article', async function (req, res, next) {
  const data = req.body
  const article = await prisma.article.update({ where: { di: data.id }, data });
  res.send(article);
});

// route remove article
router.delete('/article/:id', async function (req, res, next) {
  const { id } = req.params.id;
  const article = await prisma.article.delete({ where: { id: +id } });
  res.send(article);
});

module.exports = router;
