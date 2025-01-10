import { PrismaClient } from '@prisma/client';
import { events } from './seed/events';

const prisma = new PrismaClient();

async function main() {
    await prisma.event.createMany({
        data: events
    });

    console.log('Seed data created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });