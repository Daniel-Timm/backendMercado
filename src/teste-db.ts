import prisma from "./config/database";

async function main() {
 

const total = await prisma.produto.count();
console.log("Produtos no banco:", total);
}

main()
  .catch((erro) => console.error("Erro:", erro))
  .finally(() => prisma.$disconnect());