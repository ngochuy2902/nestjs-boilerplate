import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { PageRequest } from '@share/page/page-request';

export class QueryUtil {
  /**
   * Constructs an order object based on the sorting information in the pageRequest.
   *
   * @param query - The SelectQueryBuilder instance from TypeORM.
   * @param pageRequest - An object containing pagination (skip, take) and sorting (order) details.
   * @param tableAlias - (Optional) The alias for the table whose columns are used for sorting. Use it
   *                     when sorting columns from joined tables to avoid ambiguity.
   * @returns The query builder with pagination and sorting applied.
   */
  static applyPaginationAndSorting = <Entity extends ObjectLiteral>(
    query: SelectQueryBuilder<Entity>,
    pageRequest: PageRequest,
    tableAlias?: string,
  ): SelectQueryBuilder<Entity> => {
    const { skip, take } = pageRequest;
    const order = QueryUtil.getOrder(pageRequest, tableAlias);
    return query.skip(skip).take(take).orderBy(order);
  };

  private static getOrder = (pageRequest: PageRequest, tableAlias?: string): any => {
    const { order } = pageRequest;
    const orderObject = {};
    Object.keys(order).forEach((key) => {
      orderObject[`${tableAlias ? `${tableAlias}.` : ''}${key}`] = order[key];
    });
    return orderObject;
  };
}
