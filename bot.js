var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

var helpMessageA ="noahgula.me/heman/help.html";

function help() {
    return helpMessageA;
}

function whatsup() {
    var message = "https://www.youtube.com/watch?v=ZZ5LpwO-An4";
    return message;
}

function secret() {
    var message = cool();
    return message;
}

function lion() {
    var message = "https://www.youtube.com/watch?v=_LBmUwi6mEo";
    return message;
}

function channel() {
    var message = "https://www.youtube.com/watch?v=E9s1ltPGQOo";
    return message;
}

function shop() {
    var message = "https://www.youtube.com/watch?v=gYOEyzBFYa4";
    return message;
}

/* function holes() {
    var num = Math.floor(Math.random() * (3 - 0)) + 0;
    if(num===0) {
      var message = ("A straw has no holes.");
    }
    else if(num===1) {
      var message = ("A straw has one hole.");
    }
    else if(num===2) {
      var message = ("A straw has two holes.");
    }
    return message;
} */

function holes() {
    var message = "I don't even know, man.\n";
    var HTTPS = require('https');
    var cool = require('cool-ascii-faces');

    var botID = process.env.BOT_ID;

    var helpMessageA ="noahgula.me/heman/help.html";
}

function help() {
    return helpMessageA;
}

function whatsup() {
    var message = "https://www.youtube.com/watch?v=ZZ5LpwO-An4";
    return message;
}

function secret() {
    var message = cool();
    return message;
}

function lion() {
    var message = "https://www.youtube.com/watch?v=_LBmUwi6mEo";
    return message;
}

function channel() {
    var message = "https://www.youtube.com/watch?v=E9s1ltPGQOo";
    return message;
}

function shop() {
    var message = "https://www.youtube.com/watch?v=gYOEyzBFYa4";
    return message;
}

/* function holes() {
    var num = Math.floor(Math.random() * (3 - 0)) + 0;
    if(num===0) {
      var message = ("A straw has no holes.");
    }
    else if(num===1) {
      var message = ("A straw has one hole.");
    }
    else if(num===2) {
      var message = ("A straw has two holes.");
    }
    return message;
} */

function holes() {
    var message = "I don't even know, man.";
    return message;
}

function randomCommand() {
    var num = Math.floor(Math.random() * (7 - 0)) + 0;
    if(num===0) {
        return secret();
    }
    else if(num===1) {
        return whatsup();
    }
    else if(num===2) {
        return lion();
    }
    else if(num===3) {     
        return channel();
    }
    else if(num===4) {
        return shop();
    }
    else if(num===5) {
        return holes();
    }
    else if(num===6) {
        return help()
    }
}


function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  var botRegex = /Hi Jay!/i; botRegexHelp = /^\/help/i; botRegexWhats = /what's going on/i; botRegexLion = /lion sleeps/i; botRegexShop = /Wii shop/i; botRegexChannel = /mii channel/i; botRegexHoles = /How many holes/i; botRegexRandomCommand = /do a thing/i; botRegexLoop = /lol nice try nic/i;
  
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Hi John!");
    this.res.end();
  } 
  else if(request.text && botRegexHelp.test(request.text)) {
    this.res.writeHead(200);
    postMessage(helpMessageA);
    this.res.end();
  }
  else if(request.text && botRegexWhats.test(request.text)) {
    this.res.writeHead(200);
    postMessage(whatsup());
    this.res.end();
  }
  else if(request.text && botRegexLion.test(request.text)) {
    this.res.writeHead(200);
    postMessage(lion());
    this.res.end();
  }
  else if(request.text && botRegexShop.test(request.text)) {
    this.res.writeHead(200);
    postMessage(shop());
    this.res.end();
  }
  else if(request.text && botRegexChannel.test(request.text)) {
    this.res.writeHead(200);
    postMessage(channel());
    this.res.end();
  }
  else if(request.text && botRegexHoles.test(request.text)) {
    this.res.writeHead(200);
    postMessage(holes());
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
