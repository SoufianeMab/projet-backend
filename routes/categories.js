var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// route select all categorie
router.get('/', async function (req, res, next) {
  const take = req.params.take;
  const skip = req.params.skip;
  const categories = await prisma.categorie.findMany({ take: +take, skip: +skip });
  if (!categories) res.status(404).send("Not Found")
  res.send(categories);
});

// route select unique categorie
router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  const categorie = await prisma.categorie.findUnique({ where: { id: +id } });
  if (!categorie) res.status(404).send("Not Found")
  res.send(categorie);
});

// route add categorie
router.post('/', async function (req, res, next) {
  const data = req.body
  const categorie = await prisma.categorie.create({ data });
  res.send(categorie);
});

// route update categorie
router.patch('/', async function (req, res, next) {
  const data = req.body
  const categorie = await prisma.categorie.update({ where: { di: data.id }, data });
  res.send(categorie);
});

// route remove categorie
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  const categorie = await prisma.categorie.delete({ where: { id: +id } });
  res.send(categorie);
});

module.exports = router;
