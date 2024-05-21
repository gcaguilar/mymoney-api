import prisma from "../utils/prisma";

async function findCategory(id: number) {
  const category = await prisma.category.findFirst({
    where: {
      id: id,
    },
    select: {
      name: true,
    },
  });

  if (!category) {
    throw new Error(`Category not found for ID: ${id}`);
  }

  return category;
}

const findCategoryService = { findCategory };
export default findCategoryService;
