var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// route select all commentaire
router.get('/', async function (req, res, next) {
  const take = req.params.take;
  const skip = req.params.skip;
  const commentaires = await prisma.commentaire.findMany({ take: +take, skip: +skip });
  res.send(commentaires);
});

// route select unique commentaire
router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  const commentaire = await prisma.commentaire.findUnique({ where: { id: +id } });
  if (!commentaire) res.status(404).send("Not Found")
  res.send(commentaire);
});

// route add commentaire
router.post('/', async function (req, res, next) {
  const data = req.body
  const commentaire = await prisma.commentaire.create({ data });
  res.send(commentaire);
});

// route update commentaire
router.patch('/', async function (req, res, next) {
  const data = req.body
  const commentaire = await prisma.commentaire.update({ where: { di: data.id }, data });
  res.send(commentaire);
});

// route remove commentaire
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  const commentaire = await prisma.commentaire.delete({ where: { id: +id } });
  res.send(commentaire);
});

module.exports = router;
