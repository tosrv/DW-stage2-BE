import { prisma } from "./client";

async function main() {
  try {
    // Delete Old Data
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Create User
    const rahmat = await prisma.user.create({
      data: { name: "Rahmat", email: "rta@mail.com" },
    });

    const tomy = await prisma.user.create({
      data: { name: "Tomy", email: "tmy@mail.com" },
    });

    const april = await prisma.user.create({
      data: { name: "April", email: "apr@mail.com" },
    });

    // Create Category
    const tech = await prisma.category.create({
      data: { name: "Tech" },
    });

    const web = await prisma.category.create({
      data: { name: "Web" },
    });

    const tool = await prisma.category.create({
      data: { name: "Tool" },
    });

    const news = await prisma.category.create({
      data: { name: "News" },
    });

    // Create Post With Category Relation
    const hello = await prisma.post.create({
      data: {
        title: "Hello World",
        content: "First seeding example",
        authorId: rahmat.id,
        categories: {
          connect: [{ id: tech.id }, { id: news.id }],
        },
      },
    });

    const backend = await prisma.post.create({
      data: {
        title: "Back End Express",
        content: "Content of express",
        authorId: april.id,
        categories: {
          connect: [{ id: web.id }, { id: tech.id }],
        },
      },
    });

    const ormPrisma = await prisma.post.create({
      data: {
        title: "ORM Prisma",
        content: "Content of prisma",
        authorId: april.id,
        categories: {
          connect: [{ id: tech.id }, { id: tool.id }],
        },
      },
    });

    // Create Comment
    await prisma.comment.create({
      data: {
        content: "Nice post!",
        userId: rahmat.id,
        postId: hello.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "Good!",
        userId: tomy.id,
        postId: hello.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "Konnichiwa!",
        userId: april.id,
        postId: hello.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "Hello!",
        userId: tomy.id,
        postId: hello.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "Nice to see this post!",
        userId: rahmat.id,
        postId: hello.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "Nice post!",
        userId: tomy.id,
        postId: backend.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "Nice post!",
        userId: tomy.id,
        postId: ormPrisma.id,
      },
    });

    console.log("✅ Seed success");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();