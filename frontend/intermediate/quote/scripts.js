$(document).ready(function() {
	// 	New Quote Button -------------
	var incrementer = Math.floor(Math.random() * 30);
	var json;
	$.getJSON("https://crossorigin.me/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=30&callback=",
		function(a) {
			json = a;
			var html = "<p>";
			html += a[incrementer].content + "<p class=\"text-right\">- " + a[incrementer].title + "</p>";
			$(".message").html(html);
		});

    $("#newq").on("click", function() {
			$(".message").fadeOut("slow", function(){
				incrementer = Math.floor(Math.random() * 30);
				var html = "<p>";
				html += json[incrementer].content + "<p class=\"text-right\">- " + json[incrementer].title + "</p>";
				$(".message").html(html).fadeIn("fast");
			});
		});
	
// 	Tweet Button -------------
	$('#btnTweet').click(function (e) {
		text = json[incrementer].content.slice(3,(json[incrementer].content.length-5));
		text = text.replace(/&#8217;/g, "\'");

		if (text.length > 100){
			text = text.replace(/^(.{100}[^\s]*).*/, "$1") + "...\n";
		}
		var textToTweet = text + " - " + json[incrementer].title;
		if (textToTweet.length > 140) {
			alert('Tweet should be less than 140 Chars');
		} else {
			var twtLink = 'http://twitter.com/home?status=' +encodeURIComponent(textToTweet);
			window.open(twtLink,'_blank');
 		}
 });
});
