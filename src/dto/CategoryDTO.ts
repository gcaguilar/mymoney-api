import { KeywordDto } from "./KeywordDTO";

type CategoryWithAssociatedNamesDto = {
  id: number;
  name: string;
  associatedNames: KeywordDto[];
};

type CategoryDto = {
  id: number;
  name: string;
};

export { CategoryDto, CategoryWithAssociatedNamesDto };
