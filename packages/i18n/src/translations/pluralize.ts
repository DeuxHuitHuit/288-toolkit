import { DEV } from 'esm-env';
import type { TranslateParams } from 'packages/i18n/src/types';

export const USER_LOCALE = Symbol('user');
type USER_LOCALE = typeof USER_LOCALE;

export type PluralizeRule = number | `${number}-${number}` | Intl.LDMLPluralRule;

const RULES_REGEX = /\|(zero|one|two|few|many|other|[0-9]|[0-9]-[0-9]):/;
const ALTERNATIVES_REGEX = new RegExp(`${RULES_REGEX.toString().replace(/\//g, '')}[^|]*`, 'g');
const PLURALIZE_RULE_REGEX = (rule: PluralizeRule) => new RegExp(`\\|${rule}:`);

/**
 * Pluralize a message according to the count provided in the data.
 */
export const pluralize = (
	message: string,
	data: TranslateParams,
	locale: Maybe<string | USER_LOCALE> = null
) => {
	if (typeof message !== 'string') {
		return message;
	}
	if (!message.trim().startsWith('|')) {
		return message;
	}
	const count = data?.count;
	if (typeof count !== 'number') {
		DEV && console.warn(`No count provided for pluralization. Message: ${message}`);
		return message;
	}
	const alternatives = message.match(ALTERNATIVES_REGEX);
	if (!alternatives) {
		DEV && console.warn(`No alternatives found for pluralization. Message: ${message}`);
		return message;
	}
	// Check if there is an alternative with a specific count that corresponds to the count
	let alternative = alternatives.find((alt) => PLURALIZE_RULE_REGEX(count).test(alt));
	if (alternative) {
		return alternative.replace(RULES_REGEX, '').trim();
	}
	// Check if there is an alternative with a range that corresponds to the count
	alternative = alternatives.find((alt) => {
		const rule = alt.match(RULES_REGEX)?.[1];
		if (!rule || !rule.includes('-')) {
			return false;
		}
		const [min, max] = rule.split('-');
		return count >= Number(min) && count <= Number(max);
	});
	if (alternative) {
		return alternative.replace(RULES_REGEX, '').trim();
	}
	const effectiveLocale = locale === USER_LOCALE ? undefined : locale || undefined;
	const ordinal = data?.ordinal;
	// Find the corresponding INTL pluralization rule according to the count
	const intlRule = new Intl.PluralRules(effectiveLocale, {
		type: ordinal ? 'ordinal' : 'cardinal'
	}).select(count);
	// Find the alternative that corresponds to the INTL rule
	return (
		alternatives
			.find((alt) => PLURALIZE_RULE_REGEX(intlRule).test(alt))
			?.replace(RULES_REGEX, '')
			.trim() || message
	);
};
