require(["editor", "jquery"], function(App, $){
    var parser = new App.Parser();
    $.ajax({
	url: $('[type="text/x-sqs"]').eq(0).attr("src"),
	dataType: "xml",
	success: function(data){
	    var sqs = parser.parse(data);
	    var editor = new App.Editor(sqs, $("#container"));
	    editor.render();
	}
    });
});
