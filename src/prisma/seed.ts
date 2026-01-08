import { prisma } from "./client";

async function main() {
  try {
    // Delete old users
    await prisma.user.deleteMany();

    // Create new users
    await prisma.user.createMany({
      data: [
        {
          name: "Rahmat",
          email: "rta@mail.com",
          points: 1300,
        },
        {
          name: "Tomy",
          email: "tmy@mail.com",
          points: 1500,
        },
        {
          name: "April",
          email: "apr@mail.com",
          points: 1000,
        },
      ],
    });

    console.log("Seed success");
  } catch (err) {
    console.log(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();