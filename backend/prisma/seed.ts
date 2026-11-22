import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

// Prisma 7: a conexão passa por um "driver adapter" (parecido com escolher o driver JDBC)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const categories = ["Alimentação", "Transporte", "Lazer", "Educação"];

async function main() {
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },   
      update: {},
      create: { name },
    });
  }
  console.log(`Seed concluído: ${categories.length} categorias`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect()); 