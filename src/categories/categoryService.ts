import prisma from "../utils/prisma";

async function addCategory(name: string, associatesNames: string) {
  const { id } = await prisma.category.create({
    data: {
      userId: "1",
      name: name,
    },
  });
  return await prisma.expenseCategoryMapping.create({
    data: {
      expenseNames: associatesNames,
      userId: "1",
      categoryId: id,
    },
  });
}

async function getAll() {
  return await prisma.category.findMany({
    include: {
      expenseCategoryMapping: {
        select: {
          expenseNames: true,
        },
        where: {
          userId: "1"
        },
      },
    },
    where: {
      userId: "1",
      deleted: false
    },
  });
}

async function getById(id: number) {
  return await prisma.category.findFirstOrThrow({
    where: {
      id: id,
    },
  });
}

async function deleteById(id: number) {
  return await prisma.category.delete({
    where: {
      id: id,
    },
  });
}

async function update(id: number, name: string) {
  return await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
}

const categoryService = { addCategory, deleteById, update, getById, getAll };
export default categoryService;
