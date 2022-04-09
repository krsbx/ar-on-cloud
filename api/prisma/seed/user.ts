import { Prisma } from './instance';
import { hashText } from '../../src/utils/encryption';

const main = async (prisma: Prisma) => {
  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: await hashText('admin'),
        role: 'ADMIN',
      },
    ],
    skipDuplicates: true,
  });
};

export default function (prisma: Prisma) {
  return main(prisma);
}
