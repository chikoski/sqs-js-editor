define(["jquery", "backbone", "models", "template"], function($, Backbone, model){

    /*
     *  PhrasingContent Views
     */
    var SQSPhrasingContentView = Backbone.View.extend({
	attrname: "text",
	render: function(){
	    this.model.bind("change", this._update, this);
	    this.model.bind('destroy', this._destroy, this);
	    var data = this.model.toJSON();
	    data.id = this.model.cid;
	    this.$el = this.template.tmpl(data);
	    this.el = this.$el.get(0);

	    this.editable = this.$el.find(".editable");
	    this.edit = this.$el.find(".edit");
	    this.input = this.$el.find('input[type="text"]');
	    
	    this.delegateEvents(this.events);
	    return this;
	},
	events: {
	    "click .editable": "_edit",
	    "click .cancel": "_cancel_edit",
	    "click .update": "_updateModel",
	    "click .del": "_delete"
	},
	_edit: function(){
	    this.editable.toggleClass("hidden");
	    this.edit.toggleClass("hidden");
	},
	_cancel_edit: function(){
	    this._update();
	    this.edit.toggleClass("hidden");
	    this.editable.toggleClass("hidden");
	},
	_updateModel: function(){
	    this.model.set(this.attrname, this.input.val());
	    this._cancel_edit();
	},
	_update: function(){
	    var val = this.model.get(this.attrname);
	    this.input.val(val);
	    this.editable.text(val);
	},
	_delete: function(e){
	    e.preventDefault();
	    this.model.destroy();
	},
	_destroy: function(){
	    this.$el.remove();
	    this.el = null;
	    this.$el = null;
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
    
    var ItemView = SQSPhrasingContentView.extend({
	template: $("#sqseditor-template-item"),
	attrname: "label"
    });

    var TextareaView = SQSPhrasingContentView.extend({
	template: $("#sqseditor-template-textarea"),
	render: function(){
	    this.$el = this.template.tmpl();
	    var t = ModelViewMapper.toView(this.model.title());
	    this.$el.append(t.render().$el);
	    this.el = this.$el.get(0);
	    return this;
	}
    });

    /*
     * BoxContent Views
     */
    var SQSBoxContentView = Backbone.View.extend({
	events:{
	},
	initialize: function(){
//	    this.model.bind("add", this.render, this);
//	    this.listenTo(this.model, 'remove', this.removeElement, this);
	},
	render: function(){
	    if(this.$el){
		this.$el.empty();
	    }
	    if(this._render){
		this._render();
	    }
	    if(this.$el){
		this.el = this.$el.get(0);
		this.delegateEvents(this.events);
	    }
	    return this;
	}
    });

    var SelectOneView = SQSBoxContentView.extend({
	template: {
	    outer: $("#sqseditor-template-selectone"),
	    options: $("#sqseditor-template-options")
	},
	_render: function(){
	    var self = this;
	    self.$el = self.template.outer.tmpl();

	    var title = ModelViewMapper.toView(self.model.get("title"));
	    if(title){
		self.$el.append(title.render().$el);
	    }

	    self.$options = self.template.options.tmpl();
	    self.$el.append(self.$options);
	    self.model.options().each(function(item){
		var v = ModelViewMapper.toView(item);
		if(v){
		    self.$options.append(v.render().$el);
		}
	    });
	    this.el = this.$el.get(0);
	    return self;
	}
    });

    var SheetView = SQSBoxContentView.extend({
	template: $("#sqseditor-template-sheet"),
	_render: function(){
	    var self = this;
	    this.$el = this.template.tmpl({title: this.model.title});
	    this.model.each(function(child){
		var view = ModelViewMapper.toView(child);
		if(view){
		    self.$el.append(view.render(child.toJSON()).$el);
		}
	    });
	    return this;
	}
    });

    var GroupView = Backbone.View.extend({
	template: $("#sqseditor-template-group"),
	render: function(){
	    var hint = this.model.get("hint");
	    this.$el = this.template.tmpl();
	    if(hint){
		var h = ModelViewMapper.toView(hint);
		if(h){
		    this.$el.append(h.render().$el);
		}
	    }
	    this.el = this.$el.get(0);
	    return this;
	}
    });

    var MatrixFormView = Backbone.View.extend({
	template: {
	    matrix: $("#sqseditor-template-matrix-forms"),
	    rows: $("#sqseditor-template-row-array"),
	    columns: $("#sqseditor-template-column-array")
	},
	render: function(){
	    var self = this;
	    self.$el = self.template.matrix.tmpl();
	    var rows = self.template.rows.tmpl();
	    var columns = self.template.columns.tmpl();

	    self.model.get("columns").each(function(item){
		var v = ModelViewMapper.toView(item);
		if(v){
		    v.render();
		    columns.append(v.el);
		}
	    });
	    self.$el.append(columns);

	    self.model.get("rows").each(function(item){
		var v = ModelViewMapper.toView(item);
		if(v){
		    rows.append(v.render().el);
		}
	    });
	    self.$el.append(rows);
	    self.el = self.$el.get(0);
	    
	    return self;
	}
    });

    var ModelViewMapper = (function(){
	var map = {
	    "Sheet": SheetView,
	    "SelectOne": SelectOneView,
	    "Header": HeaderView,
	    "Paragraph": ParagraphView,
	    "Hint": HintView,
	    "Item": ItemView,
	    "Textarea": TextareaView,
	    "MatrixForm": MatrixFormView,
	    "Group": GroupView
	};
	return {
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
		}else if(obj instanceof model.Item){
		    key = "Item";
		}else if(obj instanceof model.Textarea){
		    key = "Textarea";
		}else if(obj instanceof model.MatrixForm){
		    key = "MatrixForm";
		}else if(obj instanceof model.Group){
		    key = "Group";
		}
		return map[key];
	    },
	    toView: function(obj){
		var klass = ModelViewMapper.viewOf(obj);
		var v = null;
		if(klass){
		    v = new klass({model: obj});
		}
		return v;
	    }
	};
    })();

    return {
	"Sheet": SheetView,
	"SelectOne": SelectOneView,
	"Header": HeaderView,
	"Paragraph": ParagraphView,
	"Hint": HintView,
	"Item": ItemView,
	"Textarea": TextareaView,
	"MatrixForm": MatrixFormView,
	"Group": GroupView,
	"ModelViewMapper": ModelViewMapper
    };

});