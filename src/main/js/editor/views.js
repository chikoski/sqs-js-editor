define(["jquery", "backbone", "models", "template"], function($, Backbone, model){

    /*
     *  PhrasingContent Views
     */
    var SQSPhrasingContentView = Backbone.View.extend({
	render: function(){
	    this.$el = this.template.tmpl(this.model.toJSON());
	}
    });

    var HeaderView = SQSPhrasingContentView.extend({
	template: $("#sqseditor-template-header")
    });

    var ParagraphView = SQSPhrasingContentView.extend({
	template: $("#sqseditor-template-paragraph")
    });

    var HintView = SQSPhrasingContentView.extend({
	template: $("#sqseditor-template-hint")
    });

    var LabelView = SQSPhrasingContentView.extend({
	template: $("#sqseditor-template-label")
    });

    var TextareaView = SQSPhrasingContentView.extend({
	template: $("#sqseditor-template-textarea")
    });

    /*
     * BoxContent Views
     */
    var SQSBoxContentView = Backbone.View.extend({
	initialize: function(){
	    this.model.bind("add", this.render, this);
	    this.model.bind("remove", this.render, this);
	},
	render: function(){
	    var self = this;
	    self.$el.empty();
	    
	}
    });

    var SelectOneView = SQSBoxContentView.extend({
	$el: $("#sqseditor-template-selectone")
    });

    var SheetView = Backbone.View.extend({
	template: $("#sqseditor-template-sheet"),
	render: function(){
	    return this.$el = this.template.tmpl({title: this.model.get("title")});
	}
    });

    var ModelViewMapper = Backbone.Model.extend({
    },{
	_map: {
	    "Sheet": SheetView,
	    "SelectOne": SelectOneView,
	    "Header": HeaderView,
	    "Paragraph": ParagraphView,
	    "Hint": HintView,
	    "Label": LabelView,
	    "Textarea": TextareaView
	},
	viewOf: function(obj){
	    var key = null;
	    if(obj instanceof model.Sheet){
		key = "Sheet";
	    }else if(obj instanceof model.SelectOne){
		key = "SelectOne";
	    }else if(obj instanceof model.Header){
		key = "Header";
	    }else if(obj instanceof model.Paragraph){
		key = "Paragraph";
	    }else if(obj instanceof model.Hint){
		key = "Hint";
	    }else if(obj instanceof model.Label){
		key = "Label";
	    }else if(obj instanceof model.Textarea){
		key = "Textarea";
	    }
	    return this._map[key];
	}
    });

    return {
	"Sheet": SheetView,
	"SelectOne": SelectOneView,
	"Header": HeaderView,
	"Paragraph": ParagraphView,
	"Hint": HintView,
	"Label": LabelView,
	"Textarea": TextareaView,
	"ModelViewMapper": ModelViewMapper
    };

});