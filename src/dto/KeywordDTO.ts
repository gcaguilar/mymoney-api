type KeywordDto = {
  id: number;
  name: string;
};

type KeywordWithCategoryDto = KeywordDto & {
  category: {
    id: number;
    name: string;
  };
};

type CreateExpenseCategoryMappingDto = {
  name: string;
  categoryId: number;
};

export { KeywordDto, KeywordWithCategoryDto, CreateExpenseCategoryMappingDto };
