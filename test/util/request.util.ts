export class RequestUtil {
  static generateQuery(params: Record<string, any>) {
    return new URLSearchParams(params);
  }
}
