var express=require("express");
var bodyParser=require("body-parser");
var User=require("./models/user").User;
var session=require("express-session");
var router_app=require("./routes_app");
var session_middleware=require("./middlewares/session");
var methodOverride=require("method-override");
var app=express();

app.use("/public",express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride("_method"));
app.set("view engine","jade");
app.use(session({
	secret:"123324dfxccx",
	resave:false,
	saveUninitialized:false
}));

app.get("/", function (req,res) {
	res.render("index");
	// body...
});
app.get("/signup", function (req,res) {
	res.render("signup");
	// body...
});

app.get("/login", function (req,res) {
	res.render("login");
	// body...
});

app.post("/users", function (req,res) {
	var user = new User({email: req.body.email,
		password:req.body.password,
		password_confirmation:req.body.password_confirmation,
		username:req.body.username
	});
	user.save().then(function(us){
		res.send("Guardamos");
	},function(err){

		if(err){
			console.log(String(err));
			res.send("Not saved");
		}

		
	});
	// body...
});

app.post("/sessions", function (req,res) {
	
	User.findOne({email:req.body.email,password:req.body.password},function(err,user){
		req.session.user_id=user._id;
		res.redirect("/app");
	});
	// body...
});


app.use("/app",session_middleware);
app.use("/app",router_app);

app.listen("8080");