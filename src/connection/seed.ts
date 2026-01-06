import { prisma } from "./client";

async function main() {
  // Delete Old Data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create User
  await prisma.user.create({
    data: {
      email: "rta@mail.com",
      name: "Rahmat Tomy",
      posts: {
        create: {
          title: "Hello World",
          content: "This is my first post!",
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log("seeding completed");
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
