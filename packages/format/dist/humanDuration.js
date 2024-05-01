import { t } from './translations/duration/index.js';
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
/**
 * Formats a duration in minute into something more easier to read.
 * @see humanDuration
 * @param seconds The duration in seconds
 */
export const humanSeconds = (seconds) => humanDuration(seconds / SECONDS_IN_MINUTE);
/**
 * Formats a duration in minute into something more easier to read.
 * @param durationInMinutes The duration in minutes
 */
export const humanDuration = (durationInMinutes) => {
    let useHours = false;
    let minutesLimit = 0;
    let minutesPrecision = 0;
    let unit = 'long';
    let join = ' ';
    const tUnit = (key) => t(`units.${unit}.${key}`);
    const instance = {
        useHours() {
            useHours = true;
            return instance;
        },
        useShortUnits() {
            unit = 'short';
            return instance;
        },
        minutesLimit(limit) {
            // This needs to be a positive integer
            minutesLimit = Math.max(0, Math.round(limit));
            return instance;
        },
        minutesPrecision(precision) {
            // This needs to be a positive integer
            minutesPrecision = Math.max(0, Math.round(precision));
            return instance;
        },
        join(joiner) {
            join = joiner;
            return instance;
        },
        joinWith(joiner) {
            return instance.join(t(`joins.${joiner}`));
        },
        and: () => instance.joinWith('and'),
        toString() {
            if (isNaN(durationInMinutes)) {
                return '';
            }
            // Deal with sub minute durations
            if (!minutesLimit) {
                if (durationInMinutes < 1 / SECONDS_IN_MINUTE) {
                    return `${t('lessThan')} 1 ${tUnit('second')}`;
                }
                else if (durationInMinutes < 2 / SECONDS_IN_MINUTE) {
                    return `1 ${tUnit('second')}`;
                }
                else if (durationInMinutes < 58 / SECONDS_IN_MINUTE) {
                    return `${~~(durationInMinutes * SECONDS_IN_MINUTE)} ${tUnit('seconds')}`;
                }
                else if (durationInMinutes < 1) {
                    durationInMinutes = 1;
                }
            }
            // Number of complete hours
            const hours = useHours ? Math.floor(durationInMinutes / MINUTES_IN_HOUR) : 0;
            // Remaining minutes
            const minutes = useHours ? durationInMinutes % MINUTES_IN_HOUR : durationInMinutes;
            // The string result
            const result = [];
            // Smallest displayed minutes
            const minMinute = minutesPrecision === 0 ? 0 : 1 / Math.pow(10, minutesPrecision);
            // Hours: only output hours if we are using hours and there's more than 0 hours.
            if (useHours) {
                if (hours === 1) {
                    result.push(`1 ${tUnit('hour')}`);
                }
                else if (hours > 1) {
                    result.push(`${hours.toFixed(0)} ${tUnit('hours')}`);
                }
            }
            // Minutes
            if (minutes > 0 && minutes < minutesLimit) {
                // Less then minutesLimit minutes, display only if hours is 0
                if (hours === 0) {
                    result.push(`${t('lessThan')} ${minutesLimit.toFixed(minutesPrecision)} ${Math.round(minutesLimit) < 2 ? tUnit('minute') : tUnit('minutes')}`);
                }
            }
            else if (minutes > 0 && minutes >= minMinute) {
                // More than or exactly min minute, display minutes
                result.push(`${minutes.toFixed(minutesPrecision)} ${Math.round(minutes) < 2 ? tUnit('minute') : tUnit('minutes')}`);
            }
            else if (hours === 0 && minutes <= minMinute) {
                // 0 minutes, display 1 minute
                const lessThan = Math.max(minutesLimit, minMinute);
                result.push(`${t('lessThan')} ${lessThan.toFixed(minutesPrecision)} ${Math.round(lessThan) < 2 ? tUnit('minute') : tUnit('minutes')}`);
            }
            return result.join(join);
        }
    };
    return instance;
};
