import type { DurationTranslations } from './translations/duration/en';
interface HumanDuration {
    /**
     * Use hours instead of minutes
     */
    useHours(): HumanDuration;
    /**
     * Use short units instead of long units
     */
    useShortUnits(): HumanDuration;
    /**
     * Limit the number of minutes displayed
     */
    minutesLimit(limit: number): HumanDuration;
    /**
     * Limit the number of decimal places for minutes
     */
    minutesPrecision(precision: number): HumanDuration;
    /**
     * Sets the "joiner" string between the last two units.
     */
    join(join: string): HumanDuration;
    /**
     * Sets the "joiner" translate key between the last two units.
     * @see join
     */
    joinWith(join: Join): HumanDuration;
    /**
     * Set the "joiner" string between the last two units the "and" translation key
     * @see join
     */
    and(): HumanDuration;
    /**
     * Returns the human readable duration
     */
    toString(): string;
}
type Join = keyof DurationTranslations['joins'];
export declare const SECONDS_IN_MINUTE = 60;
export declare const MINUTES_IN_HOUR = 60;
/**
 * Formats a duration in minute into something more easier to read.
 * @see humanDuration
 * @param seconds The duration in seconds
 */
export declare const humanSeconds: (seconds: number) => HumanDuration;
/**
 * Formats a duration in minute into something more easier to read.
 * @param durationInMinutes The duration in minutes
 */
export declare const humanDuration: (durationInMinutes: number) => HumanDuration;
export {};
