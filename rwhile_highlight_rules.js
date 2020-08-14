define(function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
    var RwhileHighlightRules = function() {
        var keywords = ("cons|hd|tl|=?|read|write|macro|if|then|else|fi|from|do|loop|until|read|write");
        // 組み込み定数
        var buildinConstants = ("nil");

        var keywordMapper = this.createKeywordMapper({
            "keyword": keywords,
            "constant.language": buildinConstants,
        }, "identifier");
    
    
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
       this.$rules = {
            "start" : [
                DocCommentHighlightRules.getStartRule("doc-start"),
                {
                    token : "comment", // multi line comment
                    regex : "\\(\\*",
                    next : "comment"
                }, {
                    token: keywordMapper, // String, Array, or Function: the CSS token to apply
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b", // String or RegExp: the regexp to match
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