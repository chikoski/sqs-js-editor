define(["underscore", "backbone"], function(_, Backbone){
    /*
     * Models
     */
    var SQSPhrasingContent = Backbone.Model.extend({
	defaults: {
	    text: " "
	},
	destroy: function(){
	    this.trigger("destroy", this);
	},
	copy: function(){
	    this.trigger("copy", this);
	}
    });

    var Header = SQSPhrasingContent.extend({
    });

    var Paragraph = SQSPhrasingContent.extend({
    });

    var Hint = SQSPhrasingContent.extend({
    });

    var TextArea = SQSPhrasingContent.extend({
	defaults: {
	    title: new Hint("")
	},
	validate: function(attrs){
	    if(_.isString(attrs.title)){
		attrs.title = new Hint(attrs.title);
	    }
	}
    });

    var Item = Backbone.Model.extend({
	defaults: {
	    label: "",
	    value: 0
	}
    },{
	next: function(item){
	    return new Item({value: item.get("value") + 1});
	}
    });

    
    /*
     * Collections
     */
    var SQSBoxContent = Backbone.Collection.extend({
	initialize: function(){
	    this.bind("add", this._onAdd, this);
	},
	_onAdd: function(child){
	    child.bind("destroy", this._onDestroy, this);
	    child.bind("copy", this._onCopy, this);
	},
	_onDestory: function(child){
	    this.remove(child);
	},
	_onCopy: function(child){
	    // XXX
	}
    });
    
    var Sheet = SQSBoxContent.extend({
    });

    var SelectOne = SQSBoxContent.extend({
	model: Item
    });

    /*
     * MatrixForms
     */

    var MatrixRows  = SQSBoxContent.extend({
	model: SelectOne
    });

    var MatrixColumns = SQSBoxContent.extend({
	model: Hint
    });

    var MatrixForm = Backbone.Model.extend({
	defaults: {
	    rows: new MatrixRows(),
	    columns: new MatrixColumns()
	}
    });

    return {
	"Header": Header,
	"Paragraph": Paragraph,
	"Hint": Hint,
	"Item": Item,
	"TextArea": TextArea,
	"Sheet": Sheet,
	"SelectOne": SelectOne
    };
});