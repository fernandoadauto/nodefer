var mongoose=require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var email_match=[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Is not a valid email"]

var user_schema= new Schema({
	name: String,
	username: {type:String,required:true,maxlength:[50,"Username too long"]},
	email:{type:String, required:"Email is required",match:email_match},
	password:{
		type:String,
		minlength:[8,"The password is too short"],
		validate:{
			validator: function(p){
				return this.password_confirmation==p;
			},
			message:"The passwords must match"
		}
	},
	age: Number,
	date_of_birth: Date
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c=password;
})

var User=mongoose.model("User",user_schema);

module.exports.User=User;