import { SortDirection } from '@share/enum/sort-direction.enum';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';

export class PageRequest {
  order: FindOptionsOrder<any>;
  skip: number;
  take: number;

  constructor(skip: number, take: number, order: FindOptionsOrder<any>) {
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

  static ofRequest(request: any): PageRequest {
    const {
      page = 1,
      pageSize = 10,
      sortType = SortDirection.ASC,
      sortField = 'id',
    } = request || {};
    return {
      order: {
        [sortField]: sortType,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    };
  }
}
