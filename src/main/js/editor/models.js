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

    var Textarea = SQSPhrasingContent.extend({
	defaults: {
	    title: null
	},
	title: function(){
	    if(this.get("title") == null){
		this.set("title", new Hint(""));
	    }
	    return this.get("title");
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
	title: ""
    });
/*
    var SelectOne = SQSBoxContent.extend({
	title: new Hint(),
	model: Item
    });
*/

    var Items = Backbone.Collection.extend({
	model: Item
    });
    
    var SelectOne = Backbone.Model.extend({
	defaults: {
	    title: null,
	    options: null
	},
	options: function(){
	    if(this.get("options") == null){
		this.set("options", new Items());
	    }
	    return this.get("options");
	},
	title: function(){
	    if(this.get("title") == null){
		this.set("title", new Hint());
	    }
	    return this.get("title");
	},
	add: function(item){
	    this.options().add(item);
	},
	remove: function(item){
	    this.options().remove(item);
	}
    });

    var Groups = SQSBoxContent.extend({
	model: Hint
    });

    var Group = Backbone.Model.extend({
	defults: {
	    hint: null
	}
    });

    /*
     * MatrixForms
     */

    var MatrixRows  = SQSBoxContent.extend({
	model: Group
    });

    var MatrixColumns = SQSBoxContent.extend({
	model: SelectOne
    });

    var MatrixForm = Backbone.Model.extend({
	defaults: {
	    title: null,
	    rows: null,
	    columns: null
	}
    });

    return {
	"Header": Header,
	"Paragraph": Paragraph,
	"Hint": Hint,
	"Item": Item,
	"Textarea": Textarea,
	"Sheet": Sheet,
	"SelectOne": SelectOne,
	"MatrixForm": MatrixForm,
	"ColumnArray": MatrixColumns,
	"RowArray": MatrixRows,
	"Group": Group
    };
});