import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ManipulateType } from 'dayjs';

export class DateUtil {
  static {
    dayjs.extend(utc);
    dayjs.extend(timezone);
  }

  static getDateUTC(date: string | number): Date {
    return dayjs.utc(date).toDate();
  }

  static getNowUTC(): Date {
    return dayjs().utc().toDate();
  }

  static getNowWithTimezone(timezone: string): Date {
    return dayjs().tz(timezone).toDate();
  }

  static format(date: Date, format: string): string {
    return dayjs(date).format(format);
  }

  static formatWithTimezone(date: Date, format: string, timezone: string): string {
    return dayjs(date).tz(timezone).format(format);
  }

  static add(date: Date, value: number, unit: ManipulateType): Date {
    return dayjs(date).add(value, unit).toDate();
  }

  static sub(date: Date, value: number, unit: ManipulateType): Date {
    return dayjs(date).subtract(value, unit).toDate();
  }

  static isBefore(date: Date, compare: Date): boolean {
    return dayjs(date).isBefore(compare);
  }

  static isAfter(date: Date, compare: Date): boolean {
    return dayjs(date).isAfter(compare);
  }

  static isSame(date: Date, compare: Date): boolean {
    return dayjs(date).isSame(compare);
  }

  static isSameOrBefore(date: Date, compare: Date): boolean {
    return dayjs(date).isSame(compare) || dayjs(date).isBefore(compare);
  }

  static isSameOrAfter(date: Date, compare: Date): boolean {
    return dayjs(date).isSame(compare) || dayjs(date).isAfter(compare);
  }

  static isBetween(date: Date, start: Date, end: Date): boolean {
    return this.isSameOrAfter(date, start) && this.isSameOrBefore(date, end);
  }

  static getStartOf(date: Date, unit: ManipulateType): Date {
    return dayjs(date).startOf(unit).toDate();
  }
}
