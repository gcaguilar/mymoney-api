import prisma from "../../utils/prisma";

async function addCategory(name: string) {
  const { id } = await prisma.category.create({
    data: {
      userId: "1",
      name: name,
    },
  });
  return { id };
}

async function getAll(userId: string) {
  return await prisma.category.findMany({
    where: {
      userId: userId,
      deleted: false,
    },
    select: {
      id: true,
      name: true,
    },
  });
}

async function getAllCategoriesWithMappings() {
  return await prisma.category.findMany({
    where: {
      userId: "1",
      deleted: false,
    },
    include: {
      expenseCategoryMapping: true,
    },
  });
}

async function getById(id: number) {
  return await prisma.category.findFirstOrThrow({
    where: {
      id: id,
      userId: "1",
      deleted: false,
    },
    include: {
      expenseCategoryMapping: true,
    },
  });
}

async function getByIdWithMappings(id: number) {
  return await prisma.category.findFirstOrThrow({
    where: {
      id: id,
      userId: "1",
      deleted: false,
    },
    select: {
      id: true,
      name: true,
      expenseCategoryMapping: {
        select: {
          id: true,
          name: true,
        },
      },
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

async function update(
  id: number,
  name: string,
) {
  return await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      name: name
    },
  });
}

const categoryService = {
  addCategory,
  deleteById,
  update,
  getById,
  getAll,
  getAllCategoriesWithMappings,
  getByIdWithMappings,
};
export default categoryService;
