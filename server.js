
//In terminal - run: 

//npm install  - to download the necessary modules. drag Twittersocketio folder to terminal
//node server.js - type, to run the server file in node.

var express = require('express'); //connect to the express module(external located in node_modules folder after npm install)
var http = require('http'); //connect to the http module (native to node)
var socketio = require('socket.io'); //connect to the socket.io module, this allows us to use websockets - so we can stream real time data to the server and clients.
var colors      = require('colors');
var app = express(); //instantiate object of express as app
app.use(express.static(__dirname));

var twitter = require('twitter');



var server = http.createServer(app); //create our webserver using http, but pass it our express
// application this allows express to handle traffic and websockets to work through http
var io = socketio.listen(server); //create our io object which has access to the server & express.
var port = 9001; //set our port and open on page 

var bodyParser = require('body-parser')
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var oldcurrTerm =  "love";
var newcurrTerm;

var data = 'data';

//include twitter
var Twitter = require('node-twitter');
// var twit = new twitter({

// 	consumer_key: 'qScNoj5lJ7sakflpzZVytQ',
// 	consumer_secret: 'C2yN81FEtjzKk48ea4UQhd7RgJTvwLmaPtdtV1mwvA',
// 	access_token_key: '2195072713-rIirJvaNbFx050Fk6qiM7AbZvb0seBIJSqTEZ91',
// 	access_token_secret: 'X6Nq5Wh6MVk08q1FERmaMiNOV9CmD04dym1xdyvhlWjzM'
// });

var twitterStreamClient = new Twitter.StreamClient(
    'bAVZ7rBZ2QMqboXEtMPnRpCvK',
    'pje8rlOyGV9Rn7NRYJ9K7hZ5i8kZwmoBtD2MJQ8hCzqEE7amjy',
    '15753430-HEgWgh8CnqtrJe5QcNR3C0jPt3E9yRdwUmMPYQecX',
    'whPI5kbExfxoiBOt8v8WtJsg6oezGFU0sXdInsEoNJtlx'
);



SerialPort = require("serialport").SerialPort,
	// ls /dev/tty.*
	sPort = "/dev/tty.usbmodem1411",
	// create an instance (object)
	arduino = new SerialPort(sPort, {
		baudrate: 9600
	});

	arduino.on('open', function() {
		console.log('opening port');
	// console.log((11).toString(16));
	// setInterval(toggle, 1000);
});


app.post('/input/text', urlencodedParser, function(req, res) {
  console.log("received from POST /input/text: ".green+JSON.stringify(req.body));
  if (!req.body.mytext){
    console.log("form input form is MISSING a 'mytext' field!!".red);
    return res.sendStatus(400)
  }
  else {
  	newcurrTerm = req.body.mytext;
  	//newcurrTerm = oldcurrTerm;
  	arduino.write('@' + 9 + '#'); // @1#
  	startTwitterstream(newcurrTerm);
    console.log('Browser sent text: '.blue + req.body.mytext);
    // for(var i=0; i<netsocketConnections.length; i++){
    //   //emit to all of our netsocket (arduino) connections!
    //   netsocketConnections[i].write(req.body.mytext.toString());
    // }
    arduino.write('@' + req.body.mytext.toString() + '#'); // @1#

    res.redirect('/'); //this might need to change when you use AJAX on the frontend!!
  }
});


// sample route with a route the way we're used to seeing it
app.get('/test', function(req, res) { //req = request (what came in)
                                      //res = response (what we're sending back)
	res.send('this is a test!');
});

/****
* CONFIGURE the express application
* ==============================================
*
*/
//instantiate object of express as app
var app = express();
//use the public folder to serve files and directories STATICALLY (meaning from file)
app.use(express.static(__dirname));








//input GET route for when we are SAVING DATA to our database
app.get('/input', function(req,res){ // expecting:  localhost:8080/input?name=myName&data=myData
  console.log(">> /INPUT query from URL: ".cyan + JSON.stringify(req.query));

	insertData(req.query, function(error, data){ //returns error AND data that was just submitted
    if(!error){
      console.log("insertData complete: \n".green+JSON.stringify(data));
      res.send(data)
    } else {
      console.log("error on insertData: ".red + error)
      res.send("error insertData: \n" + error)
    }
  }); //end insertData

}); //end app.get('/input')




app.use(express.static(__dirname)); //allow us to serve up the public folder for html files

server.listen(port);//start listening for traffic on our port

console.log("Listening on Port "+port+", press control-C to quit");

//socket event listener.
//this function sits and listens websocket traffic
//when it gets traffics it calls a function which it passes the socket
//for every socket event this gets called.
io.sockets.on('connection', function(socket){
	
	//when we recieve a connection - we send a hello message
	//the browser will see this right away
	//be sure to check the public folder for the response code
	// socket.emit('news', {hello: 'world'});
	
});

var data = 'data';

// stream.on('destroy', function() {
//     // Handle a 'silent' disconnection from Twitter, no end/error event fired
//   });


// newcurrTerm = oldcurrTerm;noe


startTwitterstream(oldcurrTerm);


function startTwitterstream(searchString) {
twitterStreamClient.stop(function(){
	console.log("TWITTER STOPPED")
	twitterStreamClient.start([searchString]);
});
twitterStreamClient.on('close', function() {
    console.log('Connection closed.');
});
twitterStreamClient.on('end', function() {
    console.log('End of Line.');
});
twitterStreamClient.on('error', function(error) {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
});
twitterStreamClient.on('tweet', function(tweet) {
if(tweet.place !== null){
    // console.log(tweet.place.country_code);
   
   // NORTH AMERICA  -- SEND 1 to Arduino

if (tweet.place.country_code == 'US') {
console.log('found America');
arduino.write('@' + 1 + '#'); // @1#
		}
if (tweet.place.country_code == 'BB') {
console.log('found America');
arduino.write('@' + 7 + '#'); // @1#
		}
if (tweet.place.country_code == 'CA') {
console.log('found America');
arduino.write('@' + 7 + '#'); // @1#
		}
if (tweet.place.country_code == 'JM') {
console.log('found America');
arduino.write('@' + 7 + '#'); // @1#
		}
if (tweet.place.country_code == 'MX') {
console.log('found America');
arduino.write('@' + 7 + '#'); // @1#
		}


// AFRICA  -- SEND 2 to Arduino

if (tweet.place.country_code == 'DZ') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'AO') {
console.log('found Africa');
arduino.write('@' + 8 + '#'); // @2#
		}
if (tweet.place.country_code == 'BF') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'CM') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'CG') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'EG') {
console.log('found Africa');
arduino.write('@' + 8 + '#'); // @2#
		}
if (tweet.place.country_code == 'ET') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'GH') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'GN') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'KE') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
		if (tweet.place.country_code == 'LR') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'LY') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'MG') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'MA') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'NG') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
		if (tweet.place.country_code == 'SL') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'ZA') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'SD') {
console.log('found Africa');
arduino.write('@' + 8 + '#'); // @2#
		}
if (tweet.place.country_code == 'TG') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}
if (tweet.place.country_code == 'TN') {
console.log('found Africa');
arduino.write('@' + 2 + '#'); // @2#
		}




		// EUROPE  -- SEND 3 to Arduino

if (tweet.place.country_code == 'AL') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'AT') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'BE') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'BA') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'HR') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'CY') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'FI') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'FR') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'EE') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'DK') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'CZ') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'GR') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'IS') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'IT') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'LT') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'LV') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'IE') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'LU') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'DE') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'MC') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'BA') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'HR') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'CY') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'FI') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'FR') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'EE') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'DK') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'CZ') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'GR') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'IS') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'IT') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'LT') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'NL') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'NO') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'PL') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'PT') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'RO') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'RU') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'RS') {
console.log('found Europe');
arduino.write('@' + 4 + '#'); // @3#
		}
if (tweet.place.country_code == 'CH') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'SE') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'ES') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
		if (tweet.place.country_code == 'SI') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'RS') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'UA') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}
if (tweet.place.country_code == 'GB') {
console.log('found Europe');
arduino.write('@' + 3 + '#'); // @3#
		}


// ASIA  -- SEND 4 to Arduino

if (tweet.place.country_code == 'AF') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'AM') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'AZ') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
if (tweet.place.country_code == 'BH') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'BD') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
		if (tweet.place.country_code == 'BT') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'KH') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'CN') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'GE') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'HK') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
		if (tweet.place.country_code == 'IN') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'ID') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'IR') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'IQ') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'IL') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
		if (tweet.place.country_code == 'JP') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'JO') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
if (tweet.place.country_code == 'KZ') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'KR') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
if (tweet.place.country_code == 'KW') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
		if (tweet.place.country_code == 'LA') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'LB') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
		if (tweet.place.country_code == 'MO') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'MY') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'MV') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'MN') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'MM') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
		if (tweet.place.country_code == 'NP') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'OM') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'PK') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'PH') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'QA') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
		if (tweet.place.country_code == 'SA') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
if (tweet.place.country_code == 'SG') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'LK') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'SY') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'TH') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
		if (tweet.place.country_code == 'TR') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
if (tweet.place.country_code == 'UZ') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'VN') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
if (tweet.place.country_code == 'YE') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}
if (tweet.place.country_code == 'PS') {
console.log('found Asia');
arduino.write('@' + 4 + '#'); // @4#
		}
		if (tweet.place.country_code == 'AE') {
console.log('found Asia');
arduino.write('@' + 8 + '#'); // @4#
		}



		// SOUTH AMERICA  -- SEND 5 to Arduino

if (tweet.place.country_code == 'AR') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'BO') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'BR') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'CL') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'EC') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
		if (tweet.place.country_code == 'CO') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'FK') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'GF') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'PY') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'PE') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
		if (tweet.place.country_code == 'UY') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'SR') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}
if (tweet.place.country_code == 'VE') {
console.log('found South America');
arduino.write('@' + 5 + '#'); // @5#
		}


		// AUSTRALIA  -- SEND 6 to Arduino

if (tweet.place.country_code == 'AU') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}
if (tweet.place.country_code == 'FJ') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}
if (tweet.place.country_code == 'GU') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}
if (tweet.place.country_code == 'MP') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}
if (tweet.place.country_code == 'MH') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}
		if (tweet.place.country_code == 'NZ') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}
if (tweet.place.country_code == 'PW') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}
if (tweet.place.country_code == 'PG') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}
if (tweet.place.country_code == 'TO') {
console.log('found Australia');
arduino.write('@' + 6 + '#'); // @6#
		}


}
});

//twitterStreamClient.start([oldcurrTerm]);

}

// });

// twit.stream('statuses/filter', {track: newcurrTerm}, function(stream){

// //stream on gets called when twitter sends a new event - 
// //in this case something that matches what were tracking

// stream.on(data, function(data){

// 	// console.log(data.text);
// if(data.place !== null) {
// 	// console.log(data.place.country_code);







    // NORTH AMERICA  -- SEND 1 to Arduino

// if (tweet.place.country_code == 'US') {
// console.log('found America');
// arduino.write('@' + 1 + '#'); // @1#
// 		}
// if (tweet.place.country_code == 'BB') {
// console.log('found America');
// arduino.write('@' + 1 + '#'); // @1#
// 		}
// if (tweet.place.country_code == 'CA') {
// console.log('found America');
// arduino.write('@' + 1 + '#'); // @1#
// 		}
// if (tweet.place.country_code == 'JM') {
// console.log('found America');
// arduino.write('@' + 1 + '#'); // @1#
// 		}
// if (tweet.place.country_code == 'MX') {
// console.log('found America');
// arduino.write('@' + 1 + '#'); // @1#
// 		}


// // AFRICA  -- SEND 2 to Arduino

// if (tweet.place.country_code == 'DZ') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'AO') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'BF') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'CM') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'CG') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'EG') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'ET') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'GH') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'GN') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'KE') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// 		if (tweet.place.country_code == 'LR') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'LY') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'MG') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'MA') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'NG') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// 		if (tweet.place.country_code == 'SL') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'ZA') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'SD') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'TG') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}
// if (tweet.place.country_code == 'TN') {
// console.log('found Africa');
// arduino.write('@' + 2 + '#'); // @2#
// 		}




// 		// EUROPE  -- SEND 3 to Arduino

// if (tweet.place.country_code == 'AL') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'AT') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'BE') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'BA') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'HR') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'CY') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'FI') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'FR') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'EE') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'DK') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'CZ') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'GR') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'IS') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'IT') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'LT') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'LV') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'IE') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'LU') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'DE') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'MC') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'BA') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'HR') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'CY') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'FI') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'FR') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'EE') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'DK') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'CZ') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'GR') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'IS') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'IT') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'LT') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'NL') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'NO') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'PL') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'PT') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'RO') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'RU') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'RS') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'CH') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'SE') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'ES') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// 		if (tweet.place.country_code == 'SI') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'RS') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'UA') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}
// if (tweet.place.country_code == 'GB') {
// console.log('found Europe');
// arduino.write('@' + 3 + '#'); // @3#
// 		}


// // ASIA  -- SEND 4 to Arduino

// if (tweet.place.country_code == 'AF') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'AM') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'AZ') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'BH') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'BD') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'BT') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'KH') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'CN') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'GE') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'HK') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'IN') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'ID') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'IR') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'IQ') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'IL') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'JP') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'JO') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'KZ') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'KR') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'KW') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'LA') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'LB') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'MO') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'MY') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'MV') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'MN') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'MM') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'NP') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'OM') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'PK') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'PH') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'QA') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'SA') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'SG') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'LK') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'SY') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'TH') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'TR') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'UZ') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'VN') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'YE') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// if (tweet.place.country_code == 'PS') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}
// 		if (tweet.place.country_code == 'AE') {
// console.log('found Asia');
// arduino.write('@' + 4 + '#'); // @4#
// 		}



// 		// SOUTH AMERICA  -- SEND 5 to Arduino

// if (tweet.place.country_code == 'AR') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'BO') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'BR') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'CL') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'EC') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// 		if (tweet.place.country_code == 'CO') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'FK') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'GF') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'PY') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'PE') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// 		if (tweet.place.country_code == 'UY') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'SR') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}
// if (tweet.place.country_code == 'VE') {
// console.log('found South America');
// arduino.write('@' + 5 + '#'); // @5#
// 		}


// 		// AUSTRALIA  -- SEND 6 to Arduino

// if (tweet.place.country_code == 'AU') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
// if (tweet.place.country_code == 'FJ') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
// if (tweet.place.country_code == 'GU') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
// if (tweet.place.country_code == 'MP') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
// if (tweet.place.country_code == 'MH') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
// 		if (tweet.place.country_code == 'NZ') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
// if (tweet.place.country_code == 'PW') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
// if (tweet.place.country_code == 'PG') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
// if (tweet.place.country_code == 'TO') {
// console.log('found Australia');
// arduino.write('@' + 6 + '#'); // @6#
// 		}
	


// });







// if (data.place.country_code == 'DZ' || 'AO' || 'CM' || 'CF' || 'CG') {
// console.log('found AFRICA');
// 		}




	


			

		// if(JSON.stringify(data.coordinates) == 'love') {
		// 	c_politics++;
		// 	console.log('found love: ' + c_politics);
		// 	if(c_politics % 2 == 0) {
		// 	// % this divides the count by 100, if the count will have a remainder of 0 (even division)
		// 	//then log/ or send to arduino as 1 LED ON. Otherwise, 1,2,3, divide by 100 will always have a
		// 	//remainder number so it will not send to arduino
		// 	arduino.write('@' + 1 + '#'); // @1#
		// 	console.log('1 love to arduino!!!!');
		// 		// send sth to arduino
		// 	}
		// } 
		// if(JSON.stringify(data).match('science') == 'science') {
		// 	c_science++;
		// 	console.log('science count: ' + c_science);
		// 	if(c_science % 2 == 0) {
		// 	// % this divides the count by 100, if the count will have a remainder of 0 (even division)
		// 	//then log/ or send to arduino as 1 LED ON. Otherwise, 1,2,3, divide by 100 will always have a
		// 	//remainder number so it will not send to arduino
		// 	arduino.write('@' + 2 + '#');
		// 	console.log('science to arduino!!!!');
		// 		// send sth to arduino
		// 	}
		// }


		//data contains the whole tweet object -
		//print out this whole object (data) to see what it contains

		//console.log(data);


		//here is a list of some things we are interested in from that object:
			//tweet
			//timestamp
			//person/username
			//number of followers
			//profile image

			//var tweet_text = data.text;
			//var timestamp = data.created_at;
			//var username = data.user.screen_name;
			//var numberFollowers = data.user.followers_count;
			//var profileImg = data.user.profile_image_url;

			//console.log("*****************************");

			//console.log("username: "+username);
			//console.log("tweet: "+tweet_text);
			//console.log("time: "+timestamp);
			//console.log("user_image: "+profileImg);
			//console.log("Followers: "+numberFollowers);

			//console.log("");

			//io.sockets.emit('twitter',data);

		// } );

// });








