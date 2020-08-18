ace.define("ace/mode/rwhile_highlight_rules",[], function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
    var RwhileHighlightRules = function() {
        var keyword = ("cons|hd|tl|if|fi|from|until|show|then|else|do|loop|read|write|macro");
        var builtinConstants = ("nil");

        var keywordMapper = this.createKeywordMapper({
            "keyword": keyword,
            "constant.language": builtinConstants,
        }, "identifier"); 
       this.$rules = {
            "start" : [
                {
                    token : "comment", // multi line comment
                    regex : "\\(\\*",
                    next : "comment"
                }, {
                    token: keywordMapper, // String, Array, or Function: the CSS token to apply
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b", // String or RegExp: the regexp to match
                }, {
                    token : "keyword.operator",
                    regex : "\\^=|<=|=\\?"
                }, {
                    token : "variable",
                    regex : /'(?!\s|\.|;|,|\))/,
                    next : "variable"
                }
            ],
            "variable" : [
                {
                    token : "variable",
                    regex : /[a-zA-Z0-9](?=\s|\.|;|,|\))/,
                    next : "start"
                }, {
                    token : "variable",
                    regex : /^\s*/,
                    next : "start"
                }, {
                    defaultToken : "variable"
                }
            ],
            "comment" : [
                {
                    token : "comment", // closing comment
                    regex : "\\*\\)",
                    next : "start"
                }, {
                    defaultToken : "comment"
                }
            ]
        };
    };
    
    oop.inherits(RwhileHighlightRules, TextHighlightRules);
    
    exports.RwhileHighlightRules = RwhileHighlightRules;
    
});

ace.define("ace/mode/rwhile",[], function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var Tokenizer = require("../tokenizer").Tokenizer;
    var RwhileHighlightRules = require("./rwhile_highlight_rules").RwhileHighlightRules;
    
    var Mode = function() {
        this.HighlightRules = RwhileHighlightRules;
    };
    oop.inherits(Mode, TextMode);
    
    (function() {
        this.getNextLineIndent = function(state, line, tab) {
            var indent = this.$getIndent(line);
            return indent;
        };
    
        this.autoOutdent = function(state, doc, row) {
            this.$outdent.autoOutdent(doc, row);
        };
        
    }).call(Mode.prototype);
    
    exports.Mode = Mode;
});                (function() {
                    ace.require(["ace/mode/rwhile"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            