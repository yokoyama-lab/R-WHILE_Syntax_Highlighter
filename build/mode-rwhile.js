ace.define("ace/mode/doc_comment_highlight_rules",[], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {
    this.$rules = {
        "start" : [ {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
        }, 
        DocCommentHighlightRules.getTagRule(),
        {
            defaultToken : "comment.doc",
            caseInsensitive: true
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.DocCommentHighlightRules = DocCommentHighlightRules;

});

ace.define("ace/mode/rwhile_highlight_rules",[], function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
    var RwhileHighlightRules = function() {
        var keywords = ("cons|hd|tl|=?|read|write|macro|if|then|else|fi|from|do|loop|until|read|write");
        var buildinConstants = ("nil");

        var keywordMapper = this.createKeywordMapper({
            "keyword": keywords,
            "constant.language": buildinConstants,
        }, "identifier");
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
            