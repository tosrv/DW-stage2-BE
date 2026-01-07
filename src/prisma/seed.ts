import { prisma } from "./client";

async function main() {
  try {
    // Clear Old Database
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
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

    // Create Product
    const mouse = await prisma.product.create({
      data: { name: "Mouse", price: 50000, stock: 10 },
    });

    const keyboard = await prisma.product.create({
      data: { name: "Keyboard", price: 500000, stock: 12 },
    });

    const monitor = await prisma.product.create({
      data: { name: "Monitor", price: 2000000, stock: 4 },
    });

    const laptop = await prisma.product.create({
      data: { name: "Laptop", price: 3000000, stock: 6 },
    });

    const webcam = await prisma.product.create({
      data: { name: "Webcam", price: 300000, stock: 10 },
    });

    // Create Order
    await prisma.order.createMany({
      data: [
        { userId: rahmat.id, productId: mouse.id, quantity: 3 },
        { userId: rahmat.id, productId: keyboard.id, quantity: 1 },
        { userId: tomy.id, productId: monitor.id, quantity: 2 },
        { userId: tomy.id, productId: webcam.id, quantity: 4 },
        { userId: april.id, productId: laptop.id, quantity: 1 },
        { userId: april.id, productId: keyboard.id, quantity: 3 },
      ],
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