import { SortDirection } from '@share/enum/sort-direction.enum';

export class PageRequest {
  order: {
    [field: string]: SortDirection;
  };
  skip: number;
  take: number;

  constructor(skip: number, take: number, order: { [field: string]: SortDirection }) {
    this.skip = skip;
    this.take = take;
    this.order = order;
  }

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
