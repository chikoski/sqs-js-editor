define(["jquery", "models"], function($, model){
    
    var Parser = function(){
	this.product = null;
    };
    Parser.prototype = (function(){
	
	var selectOne = function(){
	    return new model.SelectOne();
	};

	var matrixForm = function(){
/*
	    var matrix = new model.MatrixForm();
	    var self = this;
	    var elms = {};
	    this.children().each(function(){
		var elm = $(this);
		var tagname = tagnameOf(elm);
		elms[tagname.replace(/^[^:]+:/, "")] = elm.eq(0);
	    });
	    
	    return matrix;
*/
	};

	var h = function(){
	    return new model.Header({text: this.text()});
	};

	var hint = function(){
	    return new model.Hint({text: this.text()});
	};
	
	var item = function(){
	    var params = {
		label: "",
		value: 0
	    };
	    var self = this;
	    this.children().each(function(){
		var elm = $(this);
		var tagname = tagnameOf(elm);
		if(tagname == "xforms:label"){
		    params.label = elm.text();
		}else if(tagname == "xforms:value"){
		    var i = parseInt(elm.text());
		    if(!isNaN(i)){
			params.value = i;
		    }
		}
		return new model.Item(params);
	    });
	};
	
	var paragraph = function(){
	    return new model.Paragraph({text: this.text()});
	};

	var textarea = function(){
	    return new model.TextArea({text: this.text()});
	};

	var tagnameOf = function(elm){
	    return elm.get(0).tagName.toLowerCase();
	};

	var table = {
	    "h": h,
	    "xforms:select1": selectOne,
	    "sqs:matrix-forms": matrixForm,
	    "xforms:hint": hint,
	    "xforms:item": item,
	    "p": paragraph,
	    "xforms:textarea": textarea
	};
	
	var doParse = function(elm, parent){
	    var tag = tagnameOf(elm);
	    var func = table[tag];
	    var ret = null;
	    if(func != null){
		ret = func.call(elm);
	    }
	    elm.children().each(function(){
		doParse($(this), ret || parent);
	    });
	    if(parent != null && parent.add != null && ret != null){
		parent.add(ret);
	    }
	    return ret;
	};
	
	return {
	    parse: function(sqs){
		var self = this;
		self.product = new model.Sheet();

		$(sqs).children().each(function(elm){
		    doParse($(this), self.product);
		});
		
		return self.product;
	    }
	};
    })();

    return {
	"Parser": Parser
    };
    
});