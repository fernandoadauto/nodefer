var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/fotos");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","jade");

app.get("/", function (req,res) {
	res.render("index");
	// body...
});
app.get("/login", function (req,res) {
	res.render("login");
	// body...
});

app.listen("8080");