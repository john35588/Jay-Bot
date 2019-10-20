var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  var botRegex = /Hi Jay!/i; botRegexHello = /hello there/i; botRegexGot = /Got em/i; botRegexChill = /Chill/i; botRegexOof = /Oof/i; botRegexSleep = /Goodnight/i; botRegexRandomCommand = /do a thing/i; botRegexLoop = /lol nice try nic/i;
  
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Hi John!");
    this.res.end();
  }
  else if(request.text && botRegexHello.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Hey!");
    this.res.end();
  }
  else if(request.text && botRegexGot.test(request.text)) {
    this.res.writeHead(200);
    postMessage("You Can't catch me!");
    this.res.end();
  }
  else if(request.text && botRegexChill.test(request.text)) {
    this.res.writeHead(200);
    postMessage("I am chill.");
    this.res.end();
  }
  else if(request.text && botRegexOof.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Oofity Oofy!");
    this.res.end();
  }
  else if(request.text && botRegexSleep.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Sleep well!");
    this.res.end();
  }
  else if(request.text && botRegexRandomCommand.test(request.text)) {
    this.res.writeHead(200);
    postMessage(randomCommand());
    this.res.end();
  }
  else if(request.text && botRegexTrump.test(request.text)) {
    this.res.writeHead(200);
    postMessage("YOU CAN'T STUMP THE TRUMP!");
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.respond = respond;
