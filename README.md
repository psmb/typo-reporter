[![CircleCI](https://img.shields.io/circleci/project/github/psmb/typo-reporter.svg)](https://circleci.com/gh/psmb/typo-reporter/tree/master)
[![npm](https://img.shields.io/npm/v/typo-reporter.svg)](https://www.npmjs.com/package/typo-reporter)

# Description

This JS script allows your website visitors to easily report mistakes and typos on your website by selecting some text with a mistake and clicking `ctrl+enter`. The error reports would be gathered to a Google Forms Spreadsheet.

![demo](https://github.com/psmb/typo-reporter/blob/master/demo.gif)

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

Create a copy of this spreadsheet: https://docs.google.com/spreadsheets/d/1R5z4waXhx4VsCgkfhZHP_Rvpf6VWQqwmqzpqeulwws8/copy

Rename it to whatever you like. You can subscribe to email notifications in `Tools -> Notification rules`.

Now go to `Form -> Edit form` and note the id of the cloned form. You would need it at the next step.

## Init the plugin

Configuration example:

```
  var rootNode = document.createElement('div');
  document.body.appendChild(rootNode);
  var typo = new TypoReporter({
    formId: '1FAIpQLWd4bAaZYLlY38abAVosRCuZw9jJpe18sXK522IyftFYQdkvkg', // required, see previous step

    // Optional example stuff below
    locale: 'fr', // optional language, defaults to 'en'
    translations: { // optinal object with translated strings
      fr: {
        // see source code for keys to translate
      }
    },
    offset: 100, // amount of context text to grab from before and after the selection, defaults to 50
    endpointUrl: 'https://custom-endpoint-url', // optional, defaults to Google Forms
    snippetFieldName: 'entry.13240190', // optional, if using custom form
    commentFieldName: 'entry.1447231081', // optional, if using custom form
    urlFieldName: 'entry.238687347' // optional, if using custom form
  }, rootNode);
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
