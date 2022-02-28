var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// route select all article
router.get('/', async function (req, res, next) {
  const take = req.query.take;
  const skip = req.query.skip;
  const articles = await prisma.article.findMany({ take: +take, skip: +skip });
  // const articles = await prisma.article.findMany({ take: +take, skip: +skip , include:{author : true}});
  res.send(articles);
});

// route select unique article
router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  const article = await prisma.article.findUnique({ where: { id: +id } });
  if (!article) res.status(404).send("Not Found")
  res.send(article);
});

// route add article
router.post('/', async function (req, res, next) {
  const data = req.body
  const article = await prisma.article.create({ data });
  res.send(article);
});

// route update article
router.patch('/', async function (req, res, next) {
  const data = req.body
  const article = await prisma.article.update({ where: { di: data.id }, data });
  res.send(article);
});

// route remove article
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  const article = await prisma.article.delete({ where: { id: +id } });
  res.send(article);
});

module.exports = router;
