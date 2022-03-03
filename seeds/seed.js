const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient()

async function main() {
    //delet tables
    await prisma.commentaire.deleteMany();
    await prisma.article.deleteMany();
    await prisma.categorie.deleteMany();
    await prisma.utilisateur.deleteMany();

    // add user role author
    for (let i = 1; i <= 11; i++) {
        await prisma.utilisateur.create({
            data: {
                nom: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: (i == 11) ? 'ADMIN' : 'AUTHOR'
            }
        })
    }
    // add c
    for (let i = 0; i < 10; i++) {
        await prisma.categorie.create({
            data: {
                nom: faker.lorem.word()
            }
        })
    }
    ////////////
    const users = await prisma.utilisateur.findMany({
        where: {
            role: 'AUTHOR',
        },
        select: {
            id: true,
        }
    })
    const cat = await prisma.categorie.findMany({select: {
        id: true,
    }})

    for (let i = 0; i < 100; i++) {
        await prisma.article.create({
            data: {
                title: faker.lorem.sentence(),
                contenu: faker.lorem.paragraph(),
                image: faker.image.business(),
                authorId: users[Math.floor(Math.random() * users.length)].id,
                categories: {
                    connect: SelectListCategorie(cat)
                },
                Commentaires: {
                    create: CreateListCommentaire()
                }
            }
        })
    }
}

function SelectListCategorie(cat) {
    var ListCategorie = []
    for (let i = 1; i <= Math.floor(Math.random() * (4) + 1); i++) {
        ListCategorie.push(cat[Math.floor(Math.random() * cat.length)])
    }
    return ListCategorie
}

function CreateListCommentaire() {
    var ListComment = []
    for (let i = 1; i <= Math.floor(Math.random() * (20)); i++) {
        var Comment = {
            email: faker.internet.email(),
            contenu: faker.lorem.paragraph()
        }
        ListComment.push(Comment);
    }
    return ListComment
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})