import { prisma } from "./client";
import bcrypt from "bcrypt";

async function main() {
  try {
    await prisma.user.deleteMany();

    const [email, password, role] = ["admin@mail.com", "admin123", "admin"];
    const hashPass = await bcrypt.hash(password, 10);

    // Create admin
    await prisma.user.create({
      data: {
        email,
        password: hashPass,
        role,
      },
    });

    console.log("Seed admin role");
  } catch (err) {
    console.log(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
