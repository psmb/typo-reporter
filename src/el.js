/*
 * Helper function to create a DOM elements
 *
 * @param string tagName
 * @param object attributes. Set tag attributes or event handlers.
 * Event handlers start with `on` and are written in upperCamelCase, e.g. `onClick`
 * @param array||string children. Either a string that is parsed as HTML or an array of DOM nodes
 * @return Element. Rendered Element object
 */
export default function el(tagName, attributes, children) {
	if (typeof tagName !== 'string') {
		throw new Error('tagName must be a string');
	}

	var element = document.createElement(tagName);

	if (attributes && typeof attributes === 'object') {
		Object.keys(attributes).forEach(function (i) {
			// Set event handlers
			if (/on[A-Z][a-z]/.test(i)) {
				element[i.toLowerCase()] = attributes[i];
			} else {
				// Set attributes
				element.setAttribute(i, attributes[i]);
			}
		});
	}

	if (typeof children === 'string') {
		element.innerHTML = children;
	} else if (children instanceof Array) {
		children.forEach(function (child) {
			element.appendChild(child);
		});
	}

	return element;
}
