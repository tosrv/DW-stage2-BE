// Database seeding script
import { prisma } from "./client";

async function main() {
  try {
    // Run all seed operations inside a single transaction
    await prisma.$transaction(async (tx) => {
      // Clear existing data
      await tx.stock.deleteMany();
      await tx.product.deleteMany();
      await tx.supplier.deleteMany();
      await tx.user.deleteMany();

      // Seed users (customers)
      await tx.user.createMany({
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

      // Seed suppliers
      // const doe = await tx.supplier.create({ data: { name: "Doe Inc" } });
      // const vista = await tx.supplier.create({ data: { name: "Vista Inc" } });

      // Seed products and associate them with suppliers
      // const mouse = await tx.product.create({
      //   data: {
      //     name: "Mouse",
      //     price: 50000,
      //     supplierId: doe.id,
      //   },
      // });

      // const keyboard = await tx.product.create({
      //   data: {
      //     name: "Keyboard",
      //     price: 300000,
      //     supplierId: doe.id,
      //   },
      // });

      // const webcam = await tx.product.create({
      //   data: {
      //     name: "Webcam",
      //     price: 300000,
      //     supplierId: doe.id,
      //   },
      // });

      // const monitor = await tx.product.create({
      //   data: {
      //     name: "Monitor",
      //     price: 2000000,
      //     supplierId: vista.id,
      //   },
      // });

      // const laptop = await tx.product.create({
      //   data: {
      //     name: "Laptop",
      //     price: 5000000,
      //     supplierId: vista.id,
      //   },
      // });

      // Seed initial stock for each product using batch queries
      // await tx.stock.createMany({
      //   data: [
      //     { productId: mouse.id, supplierId: doe.id, quantity: 5 },
      //     { productId: keyboard.id, supplierId: doe.id, quantity: 5 },
      //     { productId: webcam.id, supplierId: doe.id, quantity: 5 },
      //     { productId: monitor.id, supplierId: vista.id, quantity: 10 },
      //     { productId: laptop.id, supplierId: vista.id, quantity: 10 },
      //   ],
      // });
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
