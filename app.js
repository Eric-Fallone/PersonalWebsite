var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    session = require("express-session"),
    methodOverride = require("method-override"),
        User        = require("./models/user"),
        Blog       = require("./models/blog"),
        Post        = require("./models/post"),
        chat = require('./public/scripts/chat/chat-sever.js'),
        socket = require('socket.io'),
        normalizePort=require('normalize-port');

require('dotenv').config();
//routes
var indexRoute = require("./routes/index"),
     blogRoute = require("./routes/blog"),
     adminRoute = require("./routes/admin"),
     chatRoute = require("./routes/chat");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(()=> {
  console.log('Connecected to DB');
}).catch(err => {
  console.log("ERROR",err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
app.use(flash());
//require moment
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Marcus, wins cutest dog!",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000 //1 hour
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use("/",indexRoute);
app.use("/blog",blogRoute);
app.use("/admin",adminRoute);
app.use("/chat",chatRoute);
var port = normalizePort(process.env.PORT || '3000');

var server = require('http').createServer(app);
server.listen(port,function(){
  console.log("Sever Onling Port: "+port)
});

chat.startServer(server);
