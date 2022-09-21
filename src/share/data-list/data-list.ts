import { DataListRes } from '@share/data-list/res/data-list.res';

export class DataList<T> {
  totalRecords: number;
  records: T[];

  constructor(totalRecords: number, records: T[]) {
    this.totalRecords = totalRecords;
    this.records = records;
  }

  map<U>(fn: (record: T) => U): DataListRes<U> {
    return {
      totalRecords: this.totalRecords,
      records: this.records.map(fn),
    };
  }

  static of<T>(records: T[], count: number): DataList<T> {
    return new DataList(count, records);
  }
}
