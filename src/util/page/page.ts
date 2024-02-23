import { PageRequest } from '@util/page/page-request';
import { ObjectLiteral } from '@share/dto/type/object-literal';

export class Page {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPage: number;
  records: any;
  pageRequest: PageRequest;

  nextPageable(): PageRequest {
    return {
      order: this.pageRequest.order,
      skip: this.pageRequest.skip + this.pageRequest.take,
      take: this.pageRequest.take,
    };
  }

  hasNext(): boolean {
    return this.page * this.pageSize < this.totalRecords;
  }

  map<T>(fn: (record: any) => T): Page {
    return {
      ...this,
      records: this.records.map(fn),
    };
  }

  static of(records: any[], count: number, pageRequest: PageRequest): Page {
    const { skip, take } = pageRequest;
    const page = Math.floor(skip / take) + 1;
    const pageSize = take;
    const totalRecords = count;
    const totalPage = Math.ceil(count / take);
    return {
      hasNext(): boolean {
        return this.hasNext();
      },
      map<T>(fn: (record: any) => T): Page {
        return this.map(fn);
      },
      nextPageable(): PageRequest {
        return this.nextPageable();
      },
      page,
      pageSize,
      totalRecords,
      totalPage,
      records,
      pageRequest,
    };
  }
}
