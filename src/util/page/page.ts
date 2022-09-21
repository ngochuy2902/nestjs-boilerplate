import { PageRequest } from '@util/page/page-request';
import { PaginationResDto } from '@util/page/response/pagination-res.dto';

export class Page<T> {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPage: number;
  pageRequest: PageRequest;
  records: T[];

  constructor(
    page: number,
    pageSize: number,
    totalRecords: number,
    pageRequest: PageRequest,
    records: T[],
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.totalRecords = totalRecords;
    this.totalPage = Math.ceil(totalRecords / pageSize);
    this.pageRequest = pageRequest;
    this.records = records;
  }

  nextPageable(): PageRequest {
    const { order } = this.pageRequest;
    return new PageRequest(this.page * this.pageSize, this.pageSize, order);
  }

  hasNext(): boolean {
    return this.page < this.totalPage;
  }

  map<T>(fn: (record: any) => T): PaginationResDto {
    return {
      page: this.page,
      pageSize: this.pageSize,
      totalRecords: this.totalRecords,
      totalPage: this.totalPage,
      records: this.records.map(fn),
    };
  }

  static of<T>(records: any[], count: number, pageRequest: PageRequest): Page<T> {
    const { skip, take } = pageRequest;
    const page = Math.floor(skip / take) + 1;
    return new Page(page, take, count, pageRequest, records);
  }
}
