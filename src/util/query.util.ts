import { PageRequest } from './page/page-request';

export class QueryUtil {
  static getOrder = (pageRequest: PageRequest, tableAlias?: string): any => {
    const { order } = pageRequest;
    const orderObject = {};
    Object.keys(order).forEach((key) => {
      orderObject[`${tableAlias ? `${tableAlias}.` : ''}${key}`] = order[key];
    });
    return orderObject;
  };
}
