import { removeLineBreaks, removeSpaces } from '@288-toolkit/strings';
import { expect, test } from 'vitest';
import { html } from '../src/html';

test('toString() returns the processed html', () => {
	const testHtml = '<h1>Test</h1>';
	const result = html(testHtml).toString();
	expect(result).toBe(testHtml);
});

test('stripTags() returns the processed html without tags', () => {
	const testHtml = removeLineBreaks(`
		<ul data-list="test">
			<li>
				<a href="/en">Home</a>
			</li>
			<li>
				<a href="/en/contact">Contact</a>
			</li>
			<li>
				<a href="/en/about">About</a>
			</li>
		</ul>
	`);

	// Without preservedTags
	const result = html(testHtml).stripTags().toString();

	expect(result).toBe('HomeContactAbout');

	// With preservedTags
	const preservedTagsResult = html(testHtml).stripTags(['a']).toString();

	const expectedResult = `
		<a href="/en">Home</a>
		<a href="/en/contact">Contact</a>
		<a href="/en/about">About</a>
	`;

	expect(removeLineBreaks(preservedTagsResult)).toBe(removeLineBreaks(expectedResult));
});

test('newLinesToBr() converts line break characters to <br /> tags', () => {
	const text = `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>`;

	const result = html(text).newLinesToBr().toString();

	const expectedResult = `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>`;

	expect(result).toBe(expectedResult);
});

test('Chaining multiple methods works as expected', () => {
	const testHtml = `<h1>Title</h1><div></div><p></p>
	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>`;

	const expectedResult = `Title<br />	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>`;

	const result = html(testHtml).removeEmptyTags().stripTags(['p']).newLinesToBr().toString();

	expect(result).toBe(expectedResult);
});

test('removeEmptyTags() removes empty tags from html string', () => {
	const testHtml = `
		<h1>Title</h1>
		<p>Some text</p>
		<ol>
			<li></li>
		</ol>
		<ul>
			<li>Some</li>
			<li></li>
		</ul>
		<p><span><i></i></span></p>
		<p><img src="blablabla" /></p>
		<p><h2 /></p>
		<p><i /></p>
	`;

	const expectedHtml = removeSpaces(`
		<h1>Title</h1>
		<p>Some text</p>
		<ul>
			<li>Some</li>
		</ul>
		<p><img src="blablabla" /></p>
	`);

	const processedText = removeSpaces(html(testHtml).removeEmptyTags().toString());
	expect(processedText).toEqual(expectedHtml);
});
