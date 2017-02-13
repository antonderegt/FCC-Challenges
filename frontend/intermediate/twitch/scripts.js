$.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/brunofin?callback=?', function(data) {
	console.log(data);
	if(data.error === "Not Found") {
		alert("User Not Found");
	} else if(data.stream === null){
		$("#fccAnswer").html("<a href=\"https://www.twitch.tv/freecodecamp\" target=\"_blank\">No...</a>");
	} else if(data.stream !== null){
		$("#fccAnswer").html("<a href=\"https://www.twitch.tv/freecodecamp\" target=\"_blank\">Yes!</a> ");
		$("#fccAnswer").append(data.stream.channel.status);
	}
});
