define(function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
    var RwhileHighlightRules = function() {
        var keyword = ("cons|hd|tl|if|fi|from|until|show|then|else|do|loop|read|write|macro");

        // 組み込み定数
        var builtinConstants = ("nil");

        var keywordMapper = this.createKeywordMapper({
            "keyword": keyword,
            "constant.language": builtinConstants,
        }, "identifier"); 
    
    
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
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