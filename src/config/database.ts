import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL não definida no .env");
}

const adapter = new PrismaPg({ connectionString: url });


const prisma = new PrismaClient({ adapter});

export default prisma;