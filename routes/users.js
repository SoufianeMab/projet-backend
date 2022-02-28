var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// route select all user
router.get('/', async function (req, res, next) {
  try {
    const take = req.query.take;
    const skip = req.query.skip;
    const users = await prisma.utilisateur.findMany({ take: +take, skip: +skip });
    res.send(users);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }finally{
    async() =>{
      await prisma.$disconnect();
    }
  }
});

// route select unique user
router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  const user = await prisma.utilisateur.findUnique({ where: { id: +id } });
  if (!user) res.status(404).send("Not Found")
  res.send(user);
});

// route add user
router.post('/', async function (req, res, next) {
  const data = req.body
  const user = await prisma.utilisateur.create({ data });
  res.send(user);
});

// route update user
router.patch('/', async function (req, res, next) {
  const data = req.body
  const user = await prisma.utilisateur.update({ where: { id: data.id }, data });
  res.send(user);
});

// route remove user
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  const user = await prisma.utilisateur.delete({ where: { id: +id } });
  res.send(user);
});

module.exports = router;
