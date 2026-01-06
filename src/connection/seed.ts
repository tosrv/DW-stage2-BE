import { prisma } from "./client";

async function main() {
  // Delete Old Product Data
  await prisma.product.deleteMany();

  // Create Product Data
  await prisma.product.createMany({
    data: [
      { name: "Keyboard", price: 500000, stock: 3 },
      { name: "Mouse", price: 50000, stock: 12 },
      { name: "Laptop", price: 3000000, stock: 5 },
    ],
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
