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
            alternateNames: JSON.stringify(['J. R. R. Tolkien', 'John Tolkien']),
            location: 'England',
            links: JSON.stringify([]),
        },
    })

    const orwell = await prisma.author.create({
        data: {
            name: 'George Orwell',
            personalName: 'Eric Arthur Blair',
            birthDate: '1903',
            deathDate: '1950',
            bio: 'Eric Arthur Blair, known by his pen name George Orwell, was an English novelist and essayist.',
            alternateNames: JSON.stringify(['Eric Blair', 'Eric Arthur Blair']),
            location: 'England',
            links: JSON.stringify([]),
        },
    })

    // Create sample works
    const lotr = await prisma.work.create({
        data: {
            title: 'The Lord of the Rings',
            subtitle: 'The Fellowship of the Ring',
            description: 'The first part of J. R. R. Tolkien\'s epic fantasy novel The Lord of the Rings.',
            firstPublishDate: '1954',
            subjects: JSON.stringify(['Fantasy', 'Adventure', 'Epic']),
            subjectPlaces: JSON.stringify(['Middle-earth']),
            subjectTimes: JSON.stringify([]),
            subjectPeople: JSON.stringify([]),
            originalLanguages: JSON.stringify(['English']),
            otherTitles: JSON.stringify([]),
        },
    })

    const nineteenEightyFour = await prisma.work.create({
        data: {
            title: '1984',
            description: 'A dystopian social science fiction novel and cautionary tale.',
            firstPublishDate: '1949',
            subjects: JSON.stringify(['Dystopian fiction', 'Political fiction', 'Science fiction']),
            subjectPlaces: JSON.stringify([]),
            subjectTimes: JSON.stringify([]),
            subjectPeople: JSON.stringify([]),
            originalLanguages: JSON.stringify(['English']),
            otherTitles: JSON.stringify([]),
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