const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding database...");

    const users = [
      { username: "admin@example.com", password: bcrypt.hashSync("password", 10), role: "admin" },
      { username: "user1@example.com", password: bcrypt.hashSync("password", 10), role: "user" },
      { username: "user2@example.com", password: bcrypt.hashSync("password", 10), role: "user" },
    ];

    for (const user of users) {
      const existingUser = await prisma.user.findUnique({ where: { username: user.username } });
      if (!existingUser) {
        await prisma.user.create({ data: user });
        console.log(`User '${user.username}' created.`);
      } else {
        console.log(`User '${user.username}' already exists. Skipping...`);
      }
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
