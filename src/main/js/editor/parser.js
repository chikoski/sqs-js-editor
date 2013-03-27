define(["jquery", "models"], function($, model){
    
    var Parser = function(){
	this.product = null;
    };
    Parser.prototype = (function(){

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
	    });
	    return new model.Item(params);
	};

	var selectOne = function(){
	    var ret = new model.SelectOne();
	    var self = this;
	    self.children().each(function(){
		var elm = $(this);
		var tagname = tagnameOf(elm);

		if(tagname == "xforms:hint"){
		    ret.set({title: hint.call(elm)});
		}else if(tagname == "xforms:item"){
		    ret.add(item.call(elm));
		}
	    });
	    return ret;
	};

	var group = function(){
	    var self = this;
	    var ret = new model.Group();
	    self.children().each(function(){
		ret.add(hint.call($(this)));
	    });
	    return ret;
	};

	var rowArray = function(){
	    var self = this;
	    var ret = new model.RowArray();
	    self.children().each(function(){
		ret.add(group.call($(this)));
	    });
	    return ret;
	};
	
	var columnArray = function(){
	    var self = this;
	    var ret = new model.ColumnArray();
	    self.children().each(function(){
		ret.add(selectOne.call($(this)));
	    });

	    return ret;
	};

	var matrixForm = function(){
	    var self = $(this);
	    var params = {};
	    self.children().each(function(){
		var elm = $(this);
		var tagname = tagnameOf(elm);

		if(tagname == "xforms:hint"){
		    params.title = hint.call(elm);
		}else if(tagname == "sqs:row-array"){
		    params.rows = rowArray.call(elm);
		}else if(tagname == "sqs:column-array"){
		    params.columns = columnArray.call(elm);
		}
	    });
	    return new model.MatrixForm(params);
	};

	var h = function(){
	    return new model.Header({text: this.text()});
	};

	var hint = function(){
	    return new model.Hint({text: this.text()});
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

	var routingTable ={
	    "h": h,
	    "xforms:select1": selectOne,
	    "sqs:matrix-forms": matrixForm,
	    "xforms:hint": hint,
	    "xforms:item": item,
	    "p": paragraph,
	    "xforms:textarea": textarea
	};

	var route = function(elm){
	    elm = $(elm || this);
	    var tagname = tagnameOf(elm);
	    var f = routingTable[tagname];
	    if(f){
		return f.call(elm);
	    }
	    return null;
	};

	var body = function(sheet){
	    var self = this;
	    self.children().each(function(){
		var ret = route(this);
		if(ret){
		    sheet.add(ret);
		}
	    });
	    return sheet;
	};

	var sheet = function(){
	    var ret = new model.Sheet();
	    ret.set({title: this.find("title").eq(0).text()});
	    body.call(this.find("body"), ret);
	    return ret;
	};
	
	return {
	    parse: function(sqs){
		var self = this;
		self.product = sheet.call($(sqs));
		return self.product;
	    }
	};
    })();

    return {
	"Parser": Parser
    };
    
});