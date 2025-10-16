export default class DateUtils {
  private date: Date;

  static readonly oneDayMs = 24 * 60 * 60 * 1000;
  static readonly oneHourMs = 60 * 60 * 1000;
  static readonly oneMinuteMs = 60 * 1000;
  static readonly oneSecondMs = 1000;
  constructor(date: Date | string | number = new Date()) {
    this.date = new Date(date);
  }

  // Static factory methods
  static now(): DateUtils {
    return new DateUtils();
  }

  static fromTimestamp(timestamp: number): DateUtils {
    return new DateUtils(timestamp);
  }

  static fromString(dateStr: string): DateUtils {
    return new DateUtils(dateStr);
  }

  static parse(date: Date | string | number): DateUtils {
    return new DateUtils(date);
  }

  static parseFromFormat(dateStr: string, format: string): DateUtils {
    const formatParts = format.split(/[-/ :]/);
    const dateParts = dateStr.split(/[-/ :]/);

    if (formatParts.length !== dateParts.length) {
      throw new Error('Invalid date format or date string');
    }

    let day = 1,
      month = 0,
      year = 1970,
      hours = 0,
      minutes = 0,
      seconds = 0;

    formatParts.forEach((part, idx) => {
      const value = parseInt(dateParts[idx], 10);
      switch (part) {
        case 'DD':
          day = value;
          break;
        case 'MM':
          month = value - 1;
          break;
        case 'YYYY':
          year = value;
          break;
        case 'HH':
          hours = value;
          break;
        case 'mm':
          minutes = value;
          break;
        case 'ss':
          seconds = value;
          break;
        default:
          break;
      }
    });

    return new DateUtils(new Date(year, month, day, hours, minutes, seconds));
  }

  static readonly dayNumberToString: Record<number, string> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };

  static readonly dayStringToNumber: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  static getWeekDayName(date: Date): string {
    return this.dayNumberToString[date.getDay()];
  }

  static getWeekDayNumber(dayName: string): number | undefined {
    return this.dayStringToNumber[dayName.toLowerCase()];
  }

  // Convert to timestamp
  toTimestamp(): number {
    return this.date.getTime();
  }

  // Convert to ISO string
  toISOString(): string {
    return this.date.toISOString();
  }

  // Getter methods
  getYear(): number {
    return this.date.getFullYear();
  }

  getMonth(): number {
    return this.date.getMonth() + 1;
  }

  getDay(): number {
    return this.date.getDate();
  }

  getWeekDay(): number {
    return this.date.getDay();
  }

  getHours(): number {
    return this.date.getHours();
  }

  getMinutes(): number {
    return this.date.getMinutes();
  }

  getSeconds(): number {
    return this.date.getSeconds();
  }

  // Add methods
  addDays(days: number): DateUtils {
    this.date.setDate(this.date.getDate() + days);
    return this;
  }

  addMonths(months: number): DateUtils {
    this.date.setMonth(this.date.getMonth() + months);
    return this;
  }

  addYears(years: number): DateUtils {
    this.date.setFullYear(this.date.getFullYear() + years);
    return this;
  }

  addHours(hours: number): DateUtils {
    this.date.setHours(this.date.getHours() + hours);
    return this;
  }

  addMinutes(minutes: number): DateUtils {
    this.date.setMinutes(this.date.getMinutes() + minutes);
    return this;
  }

  addSeconds(seconds: number): DateUtils {
    this.date.setSeconds(this.date.getSeconds() + seconds);
    return this;
  }

  // Diff in days (static)
  static diffInDays(dateA: Date | string | number, dateB: Date | string | number): number {
    const a = new Date(dateA).getTime();
    const b = new Date(dateB).getTime();
    const diff = Math.abs(a - b);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // Format method
  format(formatStr: string): string {
    const year = this.getYear();
    const month = this.getMonth().toString().padStart(2, '0');
    const day = this.getDay().toString().padStart(2, '0');
    const hours = this.getHours().toString().padStart(2, '0');
    const minutes = this.getMinutes().toString().padStart(2, '0');
    const seconds = this.getSeconds().toString().padStart(2, '0');

    return formatStr
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  toDate(): Date {
    return this.date;
  }
}
