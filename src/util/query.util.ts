import { PageRequest } from '@share/page/page-request';

export class QueryUtil {
  /**
   * Get order object
   * @param pageRequest PageRequest input object
   * @param tableAlias Need to pass table alias if the column is not the main table
   * @returns order object
   */
  static getOrder = (pageRequest: PageRequest, tableAlias?: string): any => {
    const { order } = pageRequest;
    const orderObject = {};
    Object.keys(order).forEach((key) => {
      orderObject[`${tableAlias ? `${tableAlias}.` : ''}${key}`] = order[key];
    });
    return orderObject;
  };
}
