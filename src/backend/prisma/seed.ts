import { PrismaClient } from '../generated/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Create sample authors
    const tolkien = await prisma.author.create({
        data: {
            name: 'J.R.R. Tolkien',
            personalName: 'John Ronald Reuel Tolkien',
            birthDate: '1892',
            deathDate: '1973',
            bio: 'John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic.',
            alternateNames: ['J. R. R. Tolkien', 'John Tolkien'],
            location: 'England',
            links: [],
        },
    })

    const orwell = await prisma.author.create({
        data: {
            name: 'George Orwell',
            personalName: 'Eric Arthur Blair',
            birthDate: '1903',
            deathDate: '1950',
            bio: 'Eric Arthur Blair, known by his pen name George Orwell, was an English novelist and essayist.',
            alternateNames: ['Eric Blair', 'Eric Arthur Blair'],
            location: 'England',
            links: [],
        },
    })

    // Create sample works
    const lotr = await prisma.work.create({
        data: {
            title: 'The Lord of the Rings',
            subtitle: 'The Fellowship of the Ring',
            description: 'The first part of J. R. R. Tolkien\'s epic fantasy novel The Lord of the Rings.',
            firstPublishDate: '1954',
            subjects: ['Fantasy', 'Adventure', 'Epic'],
            subjectPlaces: ['Middle-earth'],
            subjectTimes: [],
            subjectPeople: [],
            originalLanguages: ['English'],
            otherTitles: [],
        },
    })

    const nineteenEightyFour = await prisma.work.create({
        data: {
            title: '1984',
            description: 'A dystopian social science fiction novel and cautionary tale.',
            firstPublishDate: '1949',
            subjects: ['Dystopian fiction', 'Political fiction', 'Science fiction'],
            subjectPlaces: [],
            subjectTimes: [],
            subjectPeople: [],
            originalLanguages: ['English'],
            otherTitles: [],
        },
    })

    // Connect authors to works
    await prisma.authorWork.create({
        data: {
            authorId: tolkien.id,
            workId: lotr.id,
            role: 'author',
        },
    })

    await prisma.authorWork.create({
        data: {
            authorId: orwell.id,
            workId: nineteenEightyFour.id,
            role: 'author',
        },
    })

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })