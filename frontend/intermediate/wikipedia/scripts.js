$(document).ready(function(){
	var query;

	$("#btnSearch").click(function(){
		query = $("#tfSearch").val();
		$.getJSON("https://crossorigin.me/https://en.wikipedia.org//w/api.php?action=opensearch&format=json&search="+query,
		function(apiData) {
		returnResults(apiData);
		});
	});

	function returnResults(result){
		$("#pnlResults").html("<ul id=\"results\"></ul>");
		for(var i = 0; i < result[0].length; i++){
			var newListItem = "<a href=\"" + result[3][i] + "\" target=\"_blank\"> <li>" + result[1][i] + "</li></a>";
			$( "#results" ).append( newListItem );
			console.log(result[1][i]);
		}
	}
});
