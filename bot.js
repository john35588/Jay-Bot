var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  var botRegex = /hi jay/i; botRegexDoing = /how are you, jay/i; botRegexDoingT = /how are you jay/i; botRegexGot = /got em/i; botRegexOofity = /oofity oofy/i;
   botRegexOof = /oof/i; botRegexSleep = /goodnight/i; botRegexXd = /xd/i; botRegexYum = /yum/i;
  
  if(request.text && botRegexOofity.test(request.text.toLowerCase())) {
    request.text = "null";
  }
  
  if(request.text && botRegex.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Hi John!");
    request = "null";
    this.res.end();
  }
  else if(request.text && botRegexDoing.test(request.text.toLowerCase()) || botRegexDoingT.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("All is going great, How are you?");
    request = "null";
    this.res.end();
  }
  else if(request.text && botRegexGot.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("You Can't catch me!");
    request = "null";
    this.res.end();
  }
  else if(request.text && botRegexOof.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Oofity Oofy!");
    request = "null";
    this.res.end();
  }
  else if(request.text && botRegexSleep.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Sleep well!");
    request = "null";
    this.res.end();
  }
  else if(request.text && botRegexXd.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("😆");
    request = "null";
    this.res.end();
  }
  else if(request.text && botRegexYum.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("😋");
    request = "null";
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

