import prisma from "../utils/prisma";

const getKeywords = async () => {
  return await prisma.expenseCategoryMapping.findMany();
};

const getKeywordById = async (id: number) => {
  return await prisma.expenseCategoryMapping.findFirstOrThrow({
    where: {
      id: id,
    },
  });
};

const addKeyword = async (associatedNames: string, categoryId: number) => {
  return await prisma.expenseCategoryMapping.create({
    data: {
      userId: "1",
      expenseNames: associatedNames,
      categoryId: categoryId,
    },
  });
};

const deleteKeyword = async (id: number) => {
  return await prisma.expenseCategoryMapping.delete({
    where: {
      id: id,
    },
  });
};

const updateKeyword = async (
  id: number,
  name: string,
  associatedNames: string,
  categoryId: number
) => {
  return await prisma.expenseCategoryMapping.update({
    where: {
      id: id,
    },
    data: {
      expenseNames: associatedNames,
    },
  });
};

const keywordService = {
  getKeywords,
  getKeywordById,
  addKeyword,
  deleteKeyword,
  updateKeyword,
};
export default keywordService;
