require(["parser", "jquery"], function(App, $){
    console.log("hoge");
    var parser = new App.Parser();
    $.ajax({
	url: $('[type="text/x-sqs"]').eq(0).attr("src"),
	dataType: "xml",
	success: function(data){
	    var sqs = parser.parse(data);
	    console.log(sqs);
	}
    });
});
