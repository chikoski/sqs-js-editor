requirejs.config({
    paths: {
	"jquery": "jquery-1.9.1.min",
	"template": "jquery.tmpl.min",
	"backbone": "backbone-min",
	"underscore": "underscore-min"/*,
	"models": "models.min",
	"views": "views.min",
	"parser": "parser.min"
*/
    },
    shim: {
	"jquery": {
            exports: "jQuery"
        },
        "backbone":{
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        }
    }
});
