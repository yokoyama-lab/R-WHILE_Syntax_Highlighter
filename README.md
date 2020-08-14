# R-WHILE_Syntax_Highlighter
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/appleple/document-outliner/master/LICENSE)
[![npm](https://img.shields.io/npm/v/ace-builds.svg)](https://www.npmjs.com/package/ace-builds)

R-WHILE syntax highlighter with [Ace-js](http://ace.c9.io/).

## Usage
1. Install ace.js and mode-rwhile.js in the same directory on your project.
2. Write `HTML` as below.
```html
<script src="js/ace.js"></script>

<script>
    var editor = ace.edit("editor");
    editor.session.setMode("ace/mode/rwhile");
</script>
```
For more information see [http://ace.c9.io/](http://ace.c9.io/).