var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function randomJoke() {
  var jokes = [
  'Today, my son asked "Can I have a book mark?" and I burst into tears. 11 years old and he still doesn\'t know my name is Brian.',
  'Did you know the first French fries weren\'t actually cooked in France? They were cooked in Greece.',
  'If a child refuses to sleep during nap time, are they guilty of resisting a rest?',
  'The secret service isn\'t allowed to yell "Get down!" anymore when the president is about to be attacked. Now they have to yell "Donald, duck!"',
  'What do you call someone with no body and no nose? Nobody knows.'
  ]
  var randomItem = jokes[Math.floor(Math.random()*jokes.length)];
  return randomItem
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  var botRegex = /hi jay/i; botRegexT = /hello jay/i; botRegexTr = /hey jay/i; botRegexDoing = /how are you, jay/i; botRegexDoingT = /how are you jay/i; botRegexGot = /got em/i; botRegexOofity = /oofity oofy/i; botRegexOof = /oof/i; botRegexSleep = /goodnight/i; botRegexXd = /xd/i; botRegexYum = /yum/i; botRegexAdded = /added/i; botRegexAuto = /autocorrect/i; botRegexQuin = /shut up jay/i; botRegexTable = /table flip/i; botRegexDown = /i'm down/i; botRegexMorning = /morning/i; botRegexMorningT = /good morning/i; botRegexOops = /oops/i; botRegexOopsT = /oopsie/i; botRegexJokes = /tell me a joke/i;
  
  if(request.text && botRegexOofity.test(request.text.toLowerCase()) || botRegexMorningT.test(request.text.toLowerCase()) || botRegexOopsT.test(request.text.toLowerCase())) {
    request.text = "null";
  }
  
  if(request.text && botRegex.test(request.text.toLowerCase()) || botRegexT.test(request.text.toLowerCase()) || botRegexTr.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Hi " + request.name + "!");
    this.res.end();
  }
  else if(request.text && botRegexAdded.test(request.text.toLowerCase()) && request.name == "GroupMe") {
    this.res.writeHead(200);
    var searchTerm = 'added';
    var indexOfFirst = request.text.indexOf(searchTerm);
    console.log('The index of "' + searchTerm + '" from the beginning is ' + indexOfFirst);
    var searchTerm = 'to the';
    var indexOfSec = request.text.indexOf(searchTerm);
    console.log('The index of "' + searchTerm + '" from the beginning is ' + indexOfFirst);
    postMessage("Hello " + request.text.slice(indexOfFirst + 5, indexOfSec - 1) + ", welcome to the group!");
    this.res.end();
  }
  else if(request.text && botRegexDoing.test(request.text.toLowerCase()) || botRegexDoingT.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Great! How are you?");
    this.res.end();
  }
  else if(request.text && botRegexGot.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("You Can't catch me!");
    this.res.end();
  }
  else if(request.text && botRegexOof.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Oofity Oofy!");
    this.res.end();
  }
  else if(request.text && botRegexSleep.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Sleep well!");
    this.res.end();
  }
  else if(request.text && botRegexAuto.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("*Autocarrot");
    this.res.end();
  }
  else if(request.text && botRegexXd.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("😆");
    this.res.end();
  }
  else if(request.text && botRegexYum.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("😋");
    this.res.end();
  }
  else if(request.text && botRegexQuin.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Never!");
    this.res.end();
  }
  else if(request.text && botRegexTable.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage(" (╯°□°）╯︵ ┻━┻)");
    this.res.end();
  }
   else if(request.text && botRegexDown.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Me too!");
    this.res.end();
  }
  else if(request.text && botRegexMorning.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Good Morning!");
    this.res.end();
  }
  else if(request.text && botRegexOops.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Oopsie daisy");
    this.res.end();
  }
  else if(request.text && botRegexJokes.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage(randomJoke());
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

