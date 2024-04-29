import { describe, expect, test } from 'vitest';
import { deprecated, ifDev, ifNotDev, transform, whenDev } from '../src';

const productionOptions = { production: true } as const;
const devOptions = { production: false } as const;
const buildWithDeprecatedApiOptions = { buildWithDeprecatedApi: true } as const;
const buildWithoutDeprecatedApiOptions = { buildWithDeprecatedApi: false } as const;

describe('whenDev', () => {
	test('html: should replace when dev with dev code', () => {
		const code = `
			<!--#when dev-->
			<p>dev</p>
			<!--:else-->
			<p>not dev</p>
			<!--/when-->
		`;
		const expected = `
			<!--#when dev-->
			<p>dev</p>
			<!--:else-->

<!--/when-->
		`;
		const r = whenDev(devOptions).html;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
	test('html: should replace when dev with prod code', () => {
		const code = `
			<!--#when dev-->
			<p>dev</p>
			<!--:else-->
			<p>not dev</p>
			<!--/when-->
		`;
		const expected = `
			<!--#when dev-->

<!--:else-->
			<p>not dev</p>
			<!--/when-->
		`;
		const r = whenDev(productionOptions).html;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
	test('js: should replace when dev with dev code', () => {
		const code = `
			//#when dev
			alert('dev');
			//:else
			alert('not dev');
			///when
		`;
		const expected = `
			//#when dev
			alert('dev');
			//:else

///when
		`;
		const r = whenDev(devOptions).js;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
	test('js: should replace when dev with prod code', () => {
		const code = `
			//#when dev
			alert('dev');
			//:else
			alert('not dev');
			///when
		`;
		const expected = `
			//#when dev

//:else
			alert('not dev');
			///when
		`;
		const r = whenDev(productionOptions).js;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
});

describe('ifDev', () => {
	test('html: if dev should keep dev code', () => {
		const code = `
			<!--#if dev-->
			<p>dev</p>
			<p>dev</p>
			<p>dev</p>
			<!--/if-->
		`;
		const r = ifDev(devOptions).html;
		expect(code.replace(r[0], r[1])).toBe(code);
	});
	test('html: if dev should remove dev code and replace with empty lines', () => {
		const code = `
			<!--#if dev-->
			<p>dev</p>
			<p>dev</p>
			<p>dev</p>
			<!--/if-->
		`;
		const expected = `
			




		`;
		const r = ifDev(productionOptions).html;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
	test('js: if dev should keep dev code', () => {
		const code = `
			//#if dev
			alert('dev');
			alert('dev 2');
			///if
		`;
		const r = ifDev(devOptions).js;
		expect(code.replace(r[0], r[1])).toBe(code);
	});
	test('js: if dev should remove dev code and replace with empty lines', () => {
		const code = `
			//#if dev
			alert('dev');
			alert('dev 2');
			///if
		`;
		const expected = `
			



		`;
		const r = ifDev(productionOptions).js;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
});

describe('ifNotDev', () => {
	test('html: ifnot dev should keep prod code', () => {
		const code = `
			<!--#if dev-->
			<p>dev</p>
			<p>dev</p>
			<p>dev</p>
			<!--/ifnot-->
		`;
		const r = ifNotDev(productionOptions).html;
		expect(code.replace(r[0], r[1])).toBe(code);
	});
	test('html: ifnot dev should remove prod code and replace with empty lines', () => {
		const code = `
			<!--#ifnot dev-->
			<p>dev</p>
			<p>dev</p>
			<p>dev</p>
			<!--/ifnot-->
		`;
		const expected = `
			




		`;
		const r = ifNotDev(devOptions).html;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
	test('js: ifnot dev should keep prod code', () => {
		const code = `
			//#ifnot dev
			alert('dev');
			alert('dev 2');
			///ifnot
		`;
		const r = ifNotDev(productionOptions).js;
		expect(code.replace(r[0], r[1])).toBe(code);
	});
	test('js: ifnot dev should remove prod code and replace with empty lines', () => {
		const code = `
			//#ifnot dev
			alert('dev');
			alert('dev 2');
			///ifnot
		`;
		const expected = `
			



		`;
		const r = ifNotDev(devOptions).js;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
});

describe('deprecated', () => {
	test('html: should remove deprecated code', () => {
		const code = `
			<!--
				@deprecated
			-->
			<p>deprecated</p>
			<!-- @enddeprecated -->
		`;
		const expected = `





		`;
		const r = deprecated(buildWithoutDeprecatedApiOptions).html;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
	test('html: should not remove deprecated code', () => {
		const code = `
			<!--
				@deprecated
			-->
			<p>deprecated</p>
			<!-- @enddeprecated -->
		`;
		const r = deprecated(buildWithDeprecatedApiOptions).html;
		expect(code.replace(r[0], r[1])).toBe(code);
	});
	test('js: should remove deprecated code', () => {
		const code = `
			/**
			 * @deprecated
			 * @param {string} msg
			 */
			function deprecated(msg) {
				console.warn(msg);
			}
			/* @enddeprecated */
		`;
		const expected = `








		`;
		const r = deprecated(buildWithoutDeprecatedApiOptions).js;
		expect(code.replace(r[0], r[1])).toBe(expected);
	});
	test('js: should not remove deprecated code', () => {
		const code = `
			/** @deprecated
			* @param {string} msg
			*/
			function deprecated(msg) {
				console.warn(msg);
			}
			/** @enddeprecated */
		`;
		const r = deprecated(buildWithDeprecatedApiOptions).js;
		expect(code.replace(r[0], r[1])).toBe(code);
	});
});

describe('transform if/ifnot/when', () => {
	// Use the same 'file' for all tests
	const code = `<script>
		//#if dev
		export let deprecatedProp: string;
		///if
	
		const doTheThing = () => {
			//#when dev
			alert('in dev!');
			//:else
			alert('not in dev!');
			///when
		};
	</script>
	
	<!--#ifnot dev-->
	<p>Shown only in prod!</p>
	<!--/ifnot-->
`;

	test('dev: complete file', () => {
		const expected = `<script>
		//#if dev
		export let deprecatedProp: string;
		///if
	
		const doTheThing = () => {
			//#when dev
			alert('in dev!');
			//:else

///when
		};
	</script>
	
	


`;
		expect(transform(code, devOptions)).toBe(expected);
	});
	test('prod: complete file', () => {
		const expected = `<script>
		


	
		const doTheThing = () => {
			//#when dev

//:else
			alert('not in dev!');
			///when
		};
	</script>
	
	<!--#ifnot dev-->
	<p>Shown only in prod!</p>
	<!--/ifnot-->
`;
		expect(transform(code, productionOptions)).toBe(expected);
	});
});

describe('transform deprecated', () => {
	// Use the same 'file' for all tests
	const code = `<script>
	/**
	 * @deprecated This is not used anymore
	 */
	export let deprecatedProp: string;
	/* @enddeprecated */

	export let notDeprecatedProp: string;

	/**
	 * @deprecated Please do not use alert
	 */
	export const doTheThing = () => {
		alert('hey!');
	};
	/* @enddeprecated */
</script>

<!-- @deprecated -->
<p>Removed at build time</p>
<!-- @enddeprecated -->
`;

	test('with deprecated: complete file', () => {
		expect(transform(code, buildWithDeprecatedApiOptions)).toBe(code);
	});
	test('prod: complete file', () => {
		const expected = `<script>






	export let notDeprecatedProp: string;








</script>




`;
		expect(transform(code, productionOptions)).toBe(expected);
	});
});

describe('transform all', () => {
	// Use the same 'file' for all tests
	const code = `<script>
	/**
	 * This is a comment
	 */
	export let notDeprecatedProp: string;

	/**
	 * @deprecated Please do not use alert
	 */
	export const doTheThing = () => {
		//#if dev
		alert('hey dev!');
		///if
	};
	/* @enddeprecated */

	//#ifnot dev
	console.log('hi');
	///ifnot
</script>

<!-- @deprecated -->
<p>Removed at build time</p>
<!-- @enddeprecated -->
`;

	test('with deprecated in dev: complete file', () => {
		const expected = `<script>
	/**
	 * This is a comment
	 */
	export let notDeprecatedProp: string;

	/**
	 * @deprecated Please do not use alert
	 */
	export const doTheThing = () => {
		//#if dev
		alert('hey dev!');
		///if
	};
	/* @enddeprecated */

	


</script>

<!-- @deprecated -->
<p>Removed at build time</p>
<!-- @enddeprecated -->
`;
		expect(transform(code, { ...devOptions, ...buildWithDeprecatedApiOptions })).toBe(expected);
	});
	test('with deprecated in prod: complete file', () => {
		const expected = `<script>
	/**
	 * This is a comment
	 */
	export let notDeprecatedProp: string;

	/**
	 * @deprecated Please do not use alert
	 */
	export const doTheThing = () => {
		


	};
	/* @enddeprecated */

	//#ifnot dev
	console.log('hi');
	///ifnot
</script>

<!-- @deprecated -->
<p>Removed at build time</p>
<!-- @enddeprecated -->
`;
		expect(transform(code, { ...productionOptions, ...buildWithDeprecatedApiOptions })).toBe(
			expected
		);
	});
	test('without deprecated in dev: complete file', () => {
		const expected = `<script>
	/**
	 * This is a comment
	 */
	export let notDeprecatedProp: string;











	


</script>




`;
		expect(transform(code, { ...devOptions, ...buildWithoutDeprecatedApiOptions })).toBe(
			expected
		);
	});
	test('without deprecated in prod: complete file', () => {
		const expected = `<script>
	/**
	 * This is a comment
	 */
	export let notDeprecatedProp: string;











	//#ifnot dev
	console.log('hi');
	///ifnot
</script>




`;
		expect(transform(code, { ...productionOptions, ...buildWithoutDeprecatedApiOptions })).toBe(
			expected
		);
	});
});
