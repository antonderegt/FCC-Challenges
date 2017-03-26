var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.end('<h1>URL Shortener</h1><h2>Example creation usage:</h2>' +
    '<code>https://little-url.herokuapp.com/new/https://www.google.com</code>' +
    '<code>https://little-url.herokuapp.com/new/http://foo.com:80</code>' +
    '<h2>Example creation output</h2>' +
    '<code>{ "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }</code>' +
    '<h2>Usage:</h2> <code>https://little-url.herokuapp.com/2871</code>' +
    '<h2>Will redirect to:</h2> <code>https://www.google.com/</code>')
})

app.listen(8080, function () {
    console.log('Listening on 8080')
})
