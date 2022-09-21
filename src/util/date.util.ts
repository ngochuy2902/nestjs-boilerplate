import dayjs, { ManipulateType } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export class DateUtil {
  static {
    dayjs.extend(utc);
    dayjs.extend(timezone);
  }

  static getDateUTC(date: string | number): Date {
    if (!date) {
      return null;
    }
    return dayjs.utc(date).toDate();
  }

  static getDateWithFormat(date: string | number, format: string = 'YYYY/MM/DD'): Date {
    if (!date) {
      return null;
    }
    return dayjs(date, format).toDate();
  }

  static getNowUTC(): Date {
    return dayjs().utc().toDate();
  }

  static getNowWithTimezone(timezone: string): Date {
    return dayjs().tz(timezone).toDate();
  }

  static format(date: Date, format: string = 'YYYY/MM/DD'): string {
    if (!date) {
      return null;
    }
    return dayjs(date).format(format);
  }

  static nowFormat(format: string): string {
    return dayjs().format(format);
  }

  static formatWithTimezone(
    date: Date,
    timezone: string,
    format: string = 'YYYY/MM/DD HH:mm:ss',
  ): string {
    if (!date) {
      return null;
    }
    return dayjs(date).tz(timezone).format(format);
  }

  static add(date: Date, value: number, unit: ManipulateType): Date {
    if (!date) {
      return null;
    }
    return dayjs(date).add(value, unit).toDate();
  }

  static sub(date: Date, value: number, unit: ManipulateType): Date {
    if (!date) {
      return null;
    }
    return dayjs(date).subtract(value, unit).toDate();
  }

  static isBefore(date: Date, compare: Date): boolean {
    if (!date || !compare) {
      return null;
    }
    return dayjs(date).isBefore(compare);
  }

  static isAfter(date: Date, compare: Date): boolean {
    if (!date || !compare) {
      return null;
    }
    return dayjs(date).isAfter(compare);
  }

  static isEqual(date: Date, compare: Date): boolean {
    if (!date || !compare) {
      return null;
    }
    return dayjs(date).isSame(compare);
  }

  static isBeforeOrEqual(date: Date, compare: Date): boolean {
    if (!date || !compare) {
      return null;
    }
    return dayjs(date).isSame(compare) || dayjs(date).isBefore(compare);
  }

  static isAfterOrEqual(date: Date, compare: Date): boolean {
    return dayjs(date).isSame(compare) || dayjs(date).isAfter(compare);
  }

  static isBetween(date: Date, start: Date, end: Date): boolean {
    return this.isAfterOrEqual(date, start) && this.isBeforeOrEqual(date, end);
  }

  static getStartOf(date: Date, unit: ManipulateType): Date {
    return dayjs(date).startOf(unit).toDate();
  }
}
