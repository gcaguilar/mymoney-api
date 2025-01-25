import prisma from "../../utils/prisma";

async function getAllMappings(userId: string) {
  return await prisma.expenseCategoryMapping.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

async function getAllMappingsMinimal(userId: string) {
  return await prisma.expenseCategoryMapping.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
    },
  });
}

async function getMappingById(id: number, userId: string) {
  return await prisma.expenseCategoryMapping.findUniqueOrThrow({
    where: {
      id: id,
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

async function addMapping(
  expenseNames: string,
  userId: string,
  categoryId: number
) {
  return await prisma.expenseCategoryMapping.create({
    data: {
      name: expenseNames,
      userId: userId,
      category: {
        connect: { id: categoryId },
      },
    },
  });
}

async function deleteMapping(id: number, userId: string) {
  return await prisma.expenseCategoryMapping.delete({
    where: {
      id: id,
      userId: userId,
    },
  });
}

async function update(
  categoryId: number,
  userId: number,
  keywordsIds: number[]
) {
  return await prisma.expenseCategoryMapping.updateMany({
    where: {
      id: { in: keywordsIds },
      userId: userId.toString(),
    },
    data: {
      categoryId: categoryId,
    },
  });
}

const expenseCategoryMappingService = {
  update,
  getAllMappings,
  getMappingById,
  addMapping,
  deleteMapping,
  getAllMappingsMinimal,
};

export default expenseCategoryMappingService;
