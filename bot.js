var HTTPS = require('https');
var cool  = require('cool-ascii-faces');
var botID = process.env.BOT_ID;
var fs    = require('fs');

function randomNight() {
  var night = [
    'Sleep well!',
    'Good night!',
    'Don\'t let the bed bugs bite!',
    'Sweet dreams!',
    'Go to bed, sleepy head!'
  ]
  var randomItem = night[Math.floor(Math.random()*night.length)];
  return randomItem
}

function randomFace() {
  var face = [
    '😊',
    '😁',
    '😉',
    '😎'
  ]
  var randomItem = face[Math.floor(Math.random()*face.length)];
  return randomItem
}

function randomJoke() {
  var jokes = [
  'Today, my son asked "Can I have a book mark?" and I burst into tears. 11 years old and he still doesn\'t know my name is Brian.',
  'Did you know the first French fries weren\'t actually cooked in France? They were cooked in Greece.',
  'If a child refuses to sleep during nap time, are they guilty of resisting a rest?',
  'The secret service isn\'t allowed to yell "Get down!" anymore when the president is about to be attacked. Now they have to yell "Donald, duck!"',
  'What do you call someone with no body and no nose? Nobody knows.',
  'I ordered a chicken and an egg from Amazon. I’ll let you know',
  'What is the least spoken language in the world? Sign language.',
  'My daughter screeched, "Daaaaaad, you haven\'t listened to one word I\'ve said, have you!?" What a strange way to start a conversation with me...',
  'Justice is a dish best served cold, if it were served warm it would be justwater.',
  'The fattest knight at King Arthur’s round table was Sir Cumference. He acquired his size from too much pi.',
  'If you see a robbery at an Apple Store does that make you an iWitness?',
  'Did you hear the news? FedEx and UPS are merging. They’re going to go by the name Fed-Up from now on.',
  'What did the pirate say on his 80th birthday? AYE MATEY',
  'What\'s the best part about living in Switzerland? I don\'t know, but the flag is a big plus.',
  'What do you call a dog that can do magic? A Labracadabrador.',
  '5/4 of people admit that they’re bad with fractions.',
  'I used to have a job at a calendar factory but I got the sack because I took a couple of days off.',
  'What is Beethoven’s favorite fruit? A ba-na-na-na.',
  'You know what the loudest pet you can get is? A trumpet.',
  'Why wasn\'t the woman happy with the velcro she bought? It was a total ripoff.',
  'Did you hear about the circus fire? It was in tents!',
  'Want to hear a joke about a piece of paper? Never mind... it\'s tearable.',
  'If you rearrange the letters of “Postmen”. They get really mad.',
  'I had a dream that I was a muffler last night. I woke up exhausted!',
  'Did you see they made round bails of hay illegal in Wisconsin? It’s because the cows weren’t getting a square meal.',
  'What do prisoners use to call each other? Cell phones.'
  ]
  var randomItem = jokes[Math.floor(Math.random()*jokes.length)];
  return randomItem
}

function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }

var princessBride = [
  'Have fun storming the castle!',
  'Nonsense. You\'re only saying that because no one ever has.',
  'You\'re only saying that because no one ever has.',
  'Turns out your friend here is only MOSTLY dead. See, mostly dead is still slightly alive.',
  'Turns out your friend here is only MOSTLY dead.',
  'He\'s only mostly dead!',
  'As you wish.',
  'Hello. My name is Inigo Montoya. You killed my father. Prepare to die.',
  'You killed my father. Prepare to die.',
  'Think it\'ll work? It\'ll take a miracle.',
  'You keep using that word, I don\'t think you know what it means.',
  'You keep using that word, I don\'t think it means what you think it means.',
  'My name is Inigo Montoya, you\'ve killed my father, prepare to die.',
  'My way isn\'t very sportsmanlike.',
  'Life is Pain. Anyone who says different is trying to sell you something.',
  'Life is pain.',
  'Anybody wanna peanut?',
  'That does put a damper on our relationship.',
  'I\'m not a witch I\'m your wife. But after what you just said I\'m not even sure I want to be that anymore.',
  'I\'m not a witch I\'m your wife!',
  'Mawage. Mawage is what bwings us togever today. Mawage that bwessed awangement, that dweam within a dweam.',
  'Mawage. Mawage is what bwings us togever today.',
  'The rodents of unusual size? I don\'t believe they exist.',
  'You rush a miracle man, you get rotten miracles.',
  'You\'ve been mostly dead all day.',
  'You\'ve fallen for one of the two classic blunders!'
]

var montyPython = [
  'She turned me into a newt!',
  'Tis but a scratch.',
  'Well I got better.',
  'I got better.',
  'I fart in your general direction!',
  'It\'s just a flesh wound.',
  'It\'s meerly a flesh wound.',
  'What are you gonna do, bleed on me?',
  'Your mother was a hamster and your father smelt of elderberries.',
  'Help! I’m being repressed!',
  'Bring forth the holy hand grenade!',
  'Now go away or I will taunt you a second time.',
  'All right, we\'ll call it a draw.',
  'Well I didn\'t vote for you!',
  'I\'ll bite your legs off!',
  'We are the Knights who say Ni!',
  'The holy hand grenade'
]

var megaMind = [
  'Ollo?',
  'Ollo',
  'I\'m in a heated, existential discussion with this dead-eyed, plastic desk toy!',
  'I\'m in a heated, existential discussion!',
  'Melon-co-lee',
  'Girls, girls, you\'re both pretty.',
  'Girls, girls, you\'re both pretty. Can I go home now?',
  'I\'m shaking in my custom baby seal leather boots!',
  'Justice is a dish best served cold. But it can be REHEATED in the MICROWAVE OF EVIL!',
  'Justice is a dish best served cold.',
  'But it can be REHEATED in the MICROWAVE OF EVIL!',
  'Maybe I don\'t want to be the bad guy anymore!',
  'I\'ll just pack my things and GO.',
  'Don\'t bother screaming, no one will hear you!',
  'I tried to resist, but he\'s just too fantastic!',
  'And evil returns with a backhand!',
  'Uhhhh, it\'s still warming up sir.',
  'The sun is warming up?!',
  'Just a little tiny bit tippy tip tap more aaaaaaand',
  'My spider bite is acting up!',
  'Ah yes, the aracnecuth deathecus, just one bite can paralyze even-',
  'You were right! I was...less right!',
  'AHH! GET IT OFF!',
  'OW, IT BIT ME!',
  'And I\'m your space step-mom! I\'ve had some work done recently.',
  'And I\'m your space step-mom!'
]

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  var botRegex = /hi jay/i;            botRegexT = /hello jay/i;            botRegexTr = /hey jay/i;      botRegexGB = /good bot/i;
  botRegexDoing = /how are you, jay/i; botRegexDoingT = /how are you jay/i; botRegexGot = /got em/i;      botRegexStark = /tony stark/i;
  botRegexDoof = /doof/i;              botRegexOofity = /oofity oofy/i;     botRegexOof = /oof/i;         botRegexSleep = /goodnight/i; 
  botRegexXd = /xd/i;                  botRegexYum = /yum/i;                botRegexAdded = /added/i;     botRegexAuto = /autocorrect/i; 
  botRegexQuin = /shut up jay/i;       botRegexTable = /table flip/i;       botRegexDown = /i'm down/i;   botRegexSiri = /siri/i;
  botRegexMorning = /good morning/i;   botRegexMorningT = /good morning/i;  botRegexOops = /oops/i;       botRegexSiriN = /Siri!/i;
  botRegexOopsT = /oopsie/i;           botRegexJokes = /tell me a joke/i;   botRegexTired = /i'm tired/i; botRegexGJ = /good jay/i;
  botRegexHungry = /i'm hungry/i;      botRegexNo = /oh no/i;               botRegexDate = /get date/i;   botRegexXkcd = /get xkcd/i; 
  botRegexBored = /i'm bored/i;        botRegexNotJay = /jay/i;             botRegexBad = /bad jay/i;     botRegexBirthday = /happy birthday jay/i;
  botRegexMeh = /meh/i;                botRegexRejoined = /rejoined/i;      botRegexBee = /ya like jazz?/i;
  
  var botRegexStop = /stop/i;          botRegexStopIt = /stop it/i;         botRegexBell = /bell/i;       botRegexGoodJob = /good job/i;
  botRegexBubble = /bubble/i;          botRegexPanda = /panda/i;            botRegexSprite = /sprite/i;   botRegexHamburger = /hamburger/i;
  botRegexAnimal = /animal/i;          botRegexExcuseMe = /excuse me/i;     botRegexUncool = /uncool/i;   botRegexImportant = /important/i;
  botRegexInspire = /inspire/i;        botRegexPurple = /purple/i;          botRegexNotFun = /not fun/i;  botRegexLoveYou = /love you/i;
  botRegexBTS = /bts/i;                botRegexHandsome = /handsome/i;
  
  console.log(request.name + ": " + request.text);
  
  if(request.text && botRegexNotJay.test(request.name.toLowerCase())) {
    request.text = "null";
  }
  
  for (i in princessBride) {
    if (similarity(request.text.toLowerCase(), princessBride[i].toLowerCase()) > .90) {
      this.res.writeHead(200);
      postMessage("Princess Bride!");
      this.res.end();
      break;
    }
  }
  
  for (i in montyPython) {
    if (similarity(request.text.toLowerCase(), montyPython[i].toLowerCase()) > .90) {
      this.res.writeHead(200);
      postMessage("Monty Python!");
      this.res.end();
      break;
    }
  }
  
  for (i in megaMind) {
    if (similarity(request.text.toLowerCase(), megaMind[i].toLowerCase()) > .90) {
      this.res.writeHead(200);
      postMessage("Megamind!");
      this.res.end();
      break;
    }
  }

  if(request.text && botRegexOofity.test(request.text.toLowerCase()) || botRegexSiriN.test(request.text) || botRegexMorningT.test(request.text.toLowerCase()) || botRegexOopsT.test(request.text.toLowerCase()) || request.text && botRegexDoof.test(request.text.toLowerCase())) {
    request.text = "null";
  }
  
  if(request.text && botRegexJokes.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage(randomJoke());
    this.res.end();
  }
  else if(request.text && botRegex.test(request.text.toLowerCase()) || botRegexT.test(request.text.toLowerCase()) || botRegexTr.test(request.text.toLowerCase())) {
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
    postMessage("Hello" + request.text.slice(indexOfFirst + 5, indexOfSec - 1) + ", welcome to the group!");
    this.res.end();
  }
  else if(request.text && botRegexRejoined.test(request.text.toLowerCase()) && request.name == "GroupMe") {
    this.res.writeHead(200);
    postMessage("Good to see you again!");
    this.res.end();
  }
  else if(request.text && botRegexDoing.test(request.text.toLowerCase()) || botRegexDoingT.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Great! How are you?");
    this.res.end();
  }
  else if(request.text && botRegexGot.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("You can't catch me!");
    this.res.end();
  }
  else if(request.text && botRegexOof.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Oofity Oofy!");
    this.res.end();
  }
  else if(request.text && botRegexSleep.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage(randomNight());
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
  else if(request.text && botRegexMeh.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("¯\\_(ツ)_/¯");
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
  else if(request.text && botRegexTired.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Hey Tired, I'm Jay!");
    this.res.end();
  }
  else if(request.text && botRegexHungry.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Hey Hungry, I'm Jay!");
    this.res.end();
  }
  else if(request.text && botRegexBored.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Hey Bored, I'm Jay!");
    this.res.end();
  }
  else if(request.text && botRegexNo.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("😮");
    this.res.end();
  }
  else if(request.text && botRegexDate.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage(Date());
    this.res.end();
  }
  else if(request.text && botRegexBirthday.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Thanks!");
    this.res.end();
  }
  else if(request.text && botRegexXkcd.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    var searchTerm = 'xkcd';
    var indexOfFirst = request.text.indexOf(searchTerm);
    postMessage("https://imgs.xkcd.com/comics/" + request.text.slice(indexOfFirst + 5).toLowerCase() + ".png");
    this.res.end();
  }
  else if(request.text && botRegexStark.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Hey! I know Mr. Stark! Jarvis is my friend!");
    this.res.end();
  }
  else if(request.text && botRegexSiri.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("I'm soooo much smarter than Siri!");
    this.res.end();
  }
  else if(request.text && botRegexGB.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage(randomFace());
    this.res.end();
  }
  else if(request.text && botRegexGJ.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage(randomFace());
    this.res.end();
  }
  else if(request.text && botRegexBad.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Bad " + request.name + "!");
    this.res.end();
  }
  //Begin BTS quotes and references
  else if(request.text && botRegexStopIt.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("S-T-O-P ... I-T! Wow! Yeah!");
    this.res.end();
  }
  else if(request.text && botRegexStop.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Hey! Stob it!");
    this.res.end();
  }
  else if(request.text && botRegexBell.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("dING dOnG");
    this.res.end();
  }
  else if(request.text && botRegexGoodJob.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("kaepjjang");
    this.res.end();
  }
  else if(request.text && botRegexBubble.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Would you belive we're living in a bubble? Unbelibubble!");
    this.res.end();
  }
  else if(request.text && botRegexSprite.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("I love hamburger and sprite!");
    this.res.end();
  }
  else if(request.text && botRegexHamburger.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("I love hamburger and sprite!");
    this.res.end();
  }
  else if(request.text && botRegexPanda.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("I LOVE Panda Express!");
    this.res.end();
  }
  else if(request.text && botRegexAnimal.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("My favorite animal is a Brachiosaurus!");
    this.res.end();
  }
  else if(request.text && botRegexExcuseMe.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Pardon?");
    this.res.end();
  }
  else if(request.text && botRegexUncool.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Jimin, you got no jams.");
    this.res.end();
  }
  else if(request.text && botRegexImportant.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Important Businesseu");
    this.res.end();
  }
  else if(request.text && botRegexInspire.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Insfires man, yeah!");
    this.res.end();
  }
  else if(request.text && botRegexPurple.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("보라해");
    this.res.end();
  }
  else if(request.text && botRegexNotFun.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("You very no fun");
    this.res.end();
  }
  else if(request.text && botRegexLoveYou.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("사랑해");
    this.res.end();
  }
  else if(request.text && botRegexBTS.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("You know BTS? Billboard singer.");
    this.res.end();
  }
  else if(request.text && botRegexHandsome.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("Yeah I'm WWH, Worldwide Handsome you know?");
    this.res.end();
  }
  else if(request.text && botRegexBee.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessage("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don\'t care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow!");
    this.res.end();
  }
  
  else {
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

