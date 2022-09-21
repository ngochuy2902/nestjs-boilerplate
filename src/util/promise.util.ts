import { ValidatorException } from '@exception/validator.exception';

export class PromiseUtil {
  /**
   * Runs a tuple of Promises in parallel, waits for all of them to settle, then:
   *   - Returns a tuple of their fulfilled values in the same order as the input,
   *   - Or throws a ValidatorException if any promise rejects.
   *
   * @template T
   *   The tuple type of each promise’s resolved value.
   * @param {readonly [...{ [K in keyof T]: Promise<T[K]> }]} promises
   *   A readonly tuple of Promises: [Promise<T[0]>, Promise<T[1]>, …].
   * @returns {Promise<T>}
   *   A Promise that resolves to a tuple [T[0], T[1], …].
   * @throws {ValidatorException}
   *   If one or more promises reject.
   */
  static async all<T extends readonly unknown[]>(
    promises: readonly [...{ [K in keyof T]: Promise<T[K]> }],
  ): Promise<T> {
    const settled = (await Promise.allSettled(promises)) as Array<
      PromiseFulfilledResult<Awaited<T[number]>> | PromiseRejectedResult
    >;

    const errors = settled
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map((r) => r.reason);

    if (errors.length) {
      throw new ValidatorException(
        `Promises rejected (${errors.length}/${promises.length}): ` +
          errors.map((e) => (e instanceof Error ? e.message : String(e))).join(', '),
      );
    }

    const values = settled.map((r) => (r as PromiseFulfilledResult<T[number]>).value);

    return values as unknown as T;
  }
}
