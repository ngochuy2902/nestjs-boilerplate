import { PaginationReqDto } from '@util/page/request/pagination-req.dto';
import { PaginationResDto } from '@util/page/response/pagination-res.dto';
import { SortDirection } from '@share/enum/sort-direction.enum';
import { PageRequest } from '@util/page/page-request';

export class PaginationUtil {
  static getPageRequest = (query: PaginationReqDto): PageRequest => {
    const { page, pageSize, sortType, sortField } = query;
    const skip = (page - 1) * pageSize || 0;
    const take = pageSize || 10;
    const type = sortType || SortDirection.ASC;
    const field = sortField || 'id';

    return {
      order: {
        [field]: type,
      },
      skip,
      take,
    };
  };

  static getPageResponse = (data: any, paginationReq: PaginationReqDto, count: number) => {
    let { page, pageSize } = paginationReq;
    page = page || 1;
    pageSize = pageSize || 10;
    return {
      page: Number(page),
      pageSize: Number(pageSize),
      totalRecords: count,
      totalPage: Math.ceil(count / pageSize),
      records: data,
    } as PaginationResDto;
  };
}
