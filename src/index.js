import el from './el.js';

/*
 * TypoReporter.
 * @param object props. Object of options.
 * @param Element
 */
function TypoReporter(props, rootNode) {
	props = props || {};
	if (!rootNode) {
		throw new Error('"rootNode" is not passed');
	}
	if (!props.formId) {
		throw new Error('"formId" option is not defined');
	}
	props.snippetFieldName = props.snippetFieldName || 'entry.13240190';
	props.urlFieldName = props.urlFieldName || 'entry.238687347';
	props.commentFieldName = props.commentFieldName || 'entry.1447231081';
	props.endpointUrl = props.endpointUrl ||
		'https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/' +
		props.formId + '/formResponse?embedded=true';
	props.offset = props.offset || 50;
	props.translations = props.translations || this.translations;
	props.locale = props.locale || 'en';
	if (!props.translations[props.locale]) {
		throw new Error('No translations defined for locale ' + props.locale);
	}
	this.i18n = props.translations[props.locale];
	this.props = props;
	this.node = rootNode;
	this.state = {};

	// Bind methods
	this.submit = this.submit.bind(this);
	this.handleCommentChange = this.handleCommentChange.bind(this);
	this.closeDialog = this.closeDialog.bind(this);

	// Setup key bindings
	document.addEventListener('keydown', function (event) {
		if (event.ctrlKey && event.which === 13) {
			this.showDialog();
		}
		if (event.which === 27) {
			this.closeDialog();
		}
	}.bind(this));

	this.refresh();
}

TypoReporter.prototype.translations = {
	en: {
		header: 'Report a mistake on the page',
		messageLabel: 'There is a mistake in the following text:',
		commentLabel: '<strong>Do you want to send a notice to a webmaster?</strong>',
		send: '<strong>Send</strong>',
		sending: 'Sending',
		cancel: 'Cancel',
		error: 'Error! Something went wrong...'
	},
	ru: {
		header: 'Сообщите об ошибке на странице',
		messageLabel: 'Ошибка содержится в следующем тексте:',
		commentLabel: '<strong>Отправить сообщение об ошибке редактору сайта?</strong>',
		send: '<strong>Отправить</strong>',
		sending: 'Отправляю',
		cancel: 'Отмена',
		error: 'Ошибка! Что-то пошло не так...'
	}
};

TypoReporter.prototype.render = function () {
	var state = this.state;
	var i18n = this.i18n;

	return state.isOpen && el('div', {class: 'ReportTypo'}, [
		el('div', {class: 'ReportTypo-header'}, i18n.header),
		el('div', {class: 'ReportTypo-label'}, i18n.messageLabel),
		el('div', {class: 'ReportTypo-message'}, state.snippet.replace('>>>', '<u class="ReportTypo-heighlight">').replace('<<<', '</u>')),
		el('textarea', {class: 'ReportTypo-comment', onKeyup: this.handleCommentChange}, state.comment),
		el('div', {class: 'ReportTypo-label'}, i18n.commentLabel),
		el('div', {style: 'text-align: right;'}, [
			el('button', {type: 'button', class: 'ReportTypo-submit', onClick: this.submit}, state.isSending ? i18n.sending : i18n.send),
			el('button', {type: 'button', class: 'ReportTypo-cancel', onClick: this.closeDialog}, i18n.cancel)
		]),
		el('div', null, state.isError && i18n.error)
	]);
};

TypoReporter.prototype.refresh = function () {
	var node = this.node;
	node.innerHTML = '';
	var nodeTree = this.render();
	if (nodeTree) {
		node.appendChild(nodeTree);
	}
};

TypoReporter.prototype.submit =	function () {
	var state = this.state;
	var props = this.props;

	state.isSending = true;
	this.refresh();

	var formData = new FormData();
	formData.append(props.snippetFieldName, state.snippet);
	formData.append(props.commentFieldName, state.comment);
	formData.append(props.urlFieldName, window.location);

	var request = new XMLHttpRequest();
	request.open('POST', props.endpointUrl, true);
	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			this.closeDialog();
		} else {
			state.isError = true;
			state.isSending = false;
			this.refresh();
		}
	}.bind(this);
	request.onerror = function () {
		state.isError = true;
		state.isSending = false;
		this.refresh();
	}.bind(this);
	request.send(formData);
};

TypoReporter.prototype.getSnippet = function () {
	var props = this.props;

	var selection = document.getSelection();
	var selectionText = selection.toString();
	if (selectionText) {
		var range = selection.getRangeAt(0);
		var preRange = document.createRange();
		var postRange = document.createRange();
		preRange.setStartBefore(range.startContainer.ownerDocument.body);
		preRange.setEnd(range.startContainer, range.startOffset);
		postRange.setStart(range.endContainer, range.endOffset);
		postRange.setEndAfter(range.endContainer.ownerDocument.body);
		var pre = preRange.toString().substr(-props.offset);
		var post = postRange.toString().substr(0, props.offset);
		var result = pre + '>>>' + selectionText + '<<<' + post;
		var sanitize = document.createElement('div');
		sanitize.innerHTML = result;
		return sanitize.innerText.replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ');
	}
};

TypoReporter.prototype.showDialog = function () {
	var state = this.state;

	state.snippet = this.getSnippet();
	if (state.snippet) {
		state.isOpen = true;
		this.refresh();
	}
};

TypoReporter.prototype.closeDialog = function () {
	// Completely reset the state
	this.state = {};
	this.refresh();
};

TypoReporter.prototype.handleCommentChange = function (event) {
	this.state.comment = event.target.value;
};

export default TypoReporter;
