import DateUtils from './dateUtils';

export class FormatTimeUtils {
  static toUXFriendlyFormat(date: Date | string): string {
    const dateUtilsInstance = DateUtils.parse(date);
    const timestampMs = dateUtilsInstance.toTimestamp();
    if (Number.isNaN(timestampMs)) return '';

    const nowUtils = DateUtils.now();
    const diffMs = nowUtils.toTimestamp() - timestampMs;

    const { oneMinuteMs, oneHourMs, oneDayMs } = DateUtils;

    if (diffMs < 0) {
      // future date: format using DateUtils to respect locale/timezone
      return dateUtilsInstance.format('DD/MM/YYYY');
    }

    if (diffMs < oneMinuteMs) return 'just now';

    if (diffMs < oneHourMs) {
      const minutesAgo = Math.floor(diffMs / oneMinuteMs);
      return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`;
    }

    if (diffMs < oneDayMs) {
      const hoursAgo = Math.floor(diffMs / oneHourMs);
      return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
    }

    const daysAgo = Math.floor(diffMs / oneDayMs);
    if (daysAgo < 7) return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;

    // Older than a week: use DateUtils.format (DD/MM/YYYY)
    return dateUtilsInstance.format('DD/MM/YYYY');
  }
}
