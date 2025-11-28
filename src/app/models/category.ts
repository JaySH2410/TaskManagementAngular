export interface Category {
  id: number;
  name: string;
}

// DTO (if you later allow add category on UI)
export interface CreateUpdateCategoryDto {
  name: string;
}