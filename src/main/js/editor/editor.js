define(["jquery", "parser", "models", "views"], function($, parser, model, view){

    var Editor = function(sheet, el){
	this.$el = $(el);
	this.sheet = sheet;
	var v = view.ModelViewMapper.viewOf(this.sheet);
	if(v){
	    this.sheetView = new v({model: this.sheet});
	}
    };
    Editor.prototype = {
	render: function(){
	    this.$el.empty();
	    this.sheetView.render();
	    this.$el.append(this.sheetView.$el);
	}
    };
    
    return {
	Parser: parser.Parser,
	Editor: Editor
    };
});