import { runOnTransactionCommit, runOnTransactionRollback } from 'typeorm-transactional';
import { runOnTransactionComplete } from 'typeorm-transactional/dist/hooks';

export class TransactionalUtil {
  public static afterCommit(cb: () => void): void {
    return runOnTransactionCommit(cb);
  }
  public static afterRollback(cb: (e: Error) => void): void {
    return runOnTransactionRollback(cb);
  }
  public static afterComplete(cb: (e?: Error) => void): void {
    return runOnTransactionComplete(cb);
  }
}
