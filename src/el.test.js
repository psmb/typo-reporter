/* global test, expect */

import el from './el.js';

test('Render simple heading', () => {
	const node = el('h1', {class: 'H1'}, 'Hello!');
	expect(node.tagName).toEqual('H1');
	expect(node.className).toEqual('H1');
	expect(node.innerHTML).toEqual('Hello!');
	expect(node.outerHTML).toEqual('<h1 class=\"H1\">Hello!</h1>');
});

test('Render children', () => {
	const node = el('div', null, [
		el('h1', {class: 'H1'}, 'Hello!'),
		el('div', {class: 'H1'}, 'Hello!')
	]);
	expect(node.outerHTML).toEqual('<div><h1 class=\"H1\">Hello!</h1><div class=\"H1\">Hello!</div></div>');
});

test('Render empty div', () => {
	const node = el('div');
	expect(node.outerHTML).toEqual('<div></div>');
});

test('Render invalid node should throw', () => {
	expect(() => el()).toThrow();
});
