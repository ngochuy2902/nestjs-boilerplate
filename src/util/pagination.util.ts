import { PaginationReqDto } from '../dto/request/pagination-req.dto';
import { PaginationResDto } from '../dto/response/pagination-res.dto';
import { SortDirection } from '../enum/sort-direction.enum';

const getPageRequest = (query: PaginationReqDto): any => {
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

const getPageResponse = (data: any, paginationReq: PaginationReqDto, count: number) => {
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

export default {
  getPageRequest,
  getPageResponse,
};
