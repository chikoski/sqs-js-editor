define(["jquery", "parser", "models", "views"], function($, parser, model, view){

    var Editor = function(sheet, el){
	this.$el = $(el);
	this.sheet = sheet;
    };
    Editor.prototype = {
	render: function(){
	    var klass = view.ModelViewMapper.viewOf(this.sheet);
	    if(klass){
		this.sheetView = new klass({model: this.sheet});
		this.$el.empty();
		this.sheetView.render();
		this.$el.append(this.sheetView.$el);
	    }
	}
    };
    
    return {
	Parser: parser.Parser,
	Editor: Editor
    };
});