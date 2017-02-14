/* global Feature, Scenario, typo */
Feature('Reporting');

Scenario('Select text, open and close the dialog', function *(I) {
	I.amOnPage('/demo.html');
	// Grab mistake from bold text
	var mistake = yield I.grabTextFrom('p b');
	// I see that mistake on a page
	I.see(mistake, 'p');
	// Select that mistake and open dialog
	I.executeScript(function () {
		var range = document.createRange();
		range.selectNodeContents(document.querySelector('p b'));
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
		// This `typo` object is exposed on the demo page to control the modal
		// Keyboard shortcuts don't work here for some reason
		typo.showDialog();
	});
	// Heighlight text has the mistake text
	I.see(mistake, '.ReportTypo-heighlight');
	// I see Cancel button
	I.seeElement('.ReportTypo-cancel');
	// Close the dialog
	I.click('.ReportTypo-cancel');
	// I don't see the Cancel button anymore
	I.dontSeeElement('.ReportTypo-cancel');
});
