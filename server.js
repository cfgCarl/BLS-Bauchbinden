// express und http Module importieren. Sie sind dazu da, die HTML-Dateien
// aus dem Ordner "public" zu veröffentlichen.
var express = require('express');
const editJsonFile = require("edit-json-file");
var app = express();
var server = require('http').createServer(app);
var port = 8090;

// Mit diesem Kommando starten wir den Webserver.
server.listen(port, function () {
    // Wir geben einen Hinweis aus, dass der Webserer läuft.
    console.log('Webserver läuft und hört auf Port %d', port);
});

// Hier teilen wir express mit, dass die öffentlichen HTML-Dateien
// im Ordner "public" zu finden sind.

let file = editJsonFile(`${__dirname}/blsData.json`, {
    autosave: true
});

app.use(express.static(__dirname + ''));

app.get('/test', function (req, res) {
    console.log(req.query.mod)
    file.set("Referent", req.query.ref);
    file.set("Moderation", req.query.mod);
    file.set("FragenPersonen", req.query.frag);
    file.set("TechnikPersonen", req.query.tec);
    file.set("ZusatzPersonen", req.query.zusPers);
    file.set("BibelstelleAktuell", req.query.textx);
    file.set("BibelstelleNext", req.query.textNext);
    file.set("date1", req.query.date1);
    file.set("date2", req.query.date2);
    file.set("date3", req.query.date3);
    file.set("date4", req.query.date4);
    file.set("Fragen", req.query.fragen);

    res.json(file.data);
});

app.get('/abruf', function (req,res) {
    res.json(file.data);
})

// Fertig. Wir haben unseren ersten, eigenen Webserver programmiert :-)