var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// route select all user
router.get('/users', async function (req, res, next) {
  // const { take } = req.params.take;
  // const { skip } = req.params.skip;
  try {
    const users = await prisma.utilisateur.findMany({ take: 10, skip: 0});
  res.send(users);
  } catch (error) {
    res.status(500).send(error.message)
  }
});

// route select unique user
router.get('/user/:id', async function (req, res, next) {
  const { id } = req.params.id;
  const user = await prisma.user.findUnique({ where: { id: +id } });
  if (!user) res.status(404).send("Not Found")
  res.send(user);
});

// route add user
router.post('/user', async function (req, res, next) {
  const data = req.body
  const user = await prisma.user.create({ data });
  res.send(user);
});

// route update user
router.patch('/user', async function (req, res, next) {
  const data = req.body
  const user = await prisma.user.update({ where: { di: data.id }, data });
  res.send(user);
});

// route remove user
router.delete('/user/:id', async function (req, res, next) {
  const { id } = req.params.id;
  const user = await prisma.user.delete({ where: { id: +id } });
  res.send(user);
});

module.exports = router;
