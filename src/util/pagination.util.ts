import { PaginationReqDto } from '@share/dto/request/pagination-req.dto';
import { PaginationResDto } from '@share/dto/response/pagination-res.dto';
import { SortDirection } from '@share/enum/sort-direction.enum';

export class PaginationUtil {
  static getPageRequest = (query: PaginationReqDto): any => {
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
