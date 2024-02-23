import { SortDirection } from '@share/enum/sort-direction.enum';

export class PageRequest {
  order: {
    [field: string]: SortDirection;
  };
  skip: number;
  take: number;

  static of(
    page: number,
    pageSize: number,
    sortType: SortDirection,
    sortField: string,
  ): PageRequest {
    return {
      order: {
        [sortField]: sortType,
      },
      skip: (page - 1) * pageSize || 0,
      take: pageSize || 10,
    };
  }
}
