[![CircleCI](https://img.shields.io/circleci/project/github/psmb/typo-reporter.svg)](https://circleci.com/gh/psmb/typo-reporter/tree/master)
[![npm](https://img.shields.io/npm/v/typo-reporter.svg)](https://www.npmjs.com/package/typo-reporter)

# Description

This JS script allows your website visitors to easily report mistakes and typos on your website by selecting some text with a mistake and clicking `ctrl+enter`. The error reports would be gathered to a Google Forms Spreadsheet.

# Installation

## Get the script

The package is built in UMD format, so you can include it both as a link tag or consume it in JS.

### Install via npm

```
npm install --save typo-reporter
```

### Install via plain old html tag

```
<script src="https://npmcdn.com/typo-reporter@0.1.0/lib/TypoReporter.min.js"></script>
```
## Create a target Google Form to gather feedback

Go to http://forms.google.com and create a blank new form with 3 questions like this:

![image](https://cloud.githubusercontent.com/assets/837032/22926782/30f7feac-f2bf-11e6-8b43-d36c05641592.png)

It should have 3 fields for the page url (required), error text (required) and user comment (optional). The form and the fields can be named any way you like, what matters is their ids.

Next you would need to figure out the field ids. To do that open the preview of the form by cliking an eye icon and inspect the fields' names:

![image](https://cloud.githubusercontent.com/assets/837032/22927012/2a3c5d1e-f2c0-11e6-843f-a2633301f3c7.png)

Write down 3 names for each of the fields, you'll need them at the next step.

You would see submitted errors in the Response tab. You can view them in a Spreadsheet and even subscirbe to email notifications.

## Init the plugin

Minimal example:

```
<script type="text/javascript">
  var rootNode = document.createElement('div');
	document.body.appendChild(rootNode);
	var typo = new TypoReporter({
    formId: '1FAIpQLSd4bAaZYLlY38abAVosRCuZw9jJpe18sXK522IyftFYQdkvkg', // required
    snippetFieldName: 'entry.13240190', // required
		commentFieldName: 'entry.1447231081', // required
		urlFieldName: 'entry.238687347', // required
    locale: 'fr', // optional language, defaults to 'en'
    translations: { // optinal object with translated strings
      fr: {
        // see source code for keys to translate
      }
    },
    offset: 100, // amount of context text to grab from before and after the selection, defaults to 50
    endpointUrl: 'https://custom-endpoint-url' // optional, defaults to Google Forms
	}, rootNode);
</script>
```

Check out the [demo.html]('https://github.com/psmb/typo-reporter/blob/master/demo.html') for an example integration.

## Add styles

You should add your own styles for the dialog. They may look somehow like this:

```
.ReportTypo {font-family: sans; position: fixed; margin: auto; padding: 12px; top: 30%; left: 0; right: 0; max-width: 480px; background: #d7d7d7; border: 1px solid #aaa;}
.ReportTypo-message {font-family: mono; width: 100%; height: 50px; margin: 12px 0;}
.ReportTypo-comment {display: block; width: 100%; height: 100px;}
.ReportTypo-header {font-size: 21px; font-weight: bold;}
.ReportTypo-label {margin: 12px 0 6px 0;}
.ReportTypo-heighlight {color: red; font-weight: bold; text-decoration: underline;}
```

## Add some hint text for users to submit errors

A website editor can report errors now but selecting some text on a page and pressing `ctrl+enter`. You can add some small hinting banner somehwere below in the footer to tell them about that.
