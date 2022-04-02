import { prisma } from './instance';
import user from './user';

const main = async () => {
  await user(prisma);
};

// Disconnect from the database
// after the seeding
main().finally(() => prisma.$disconnect());
