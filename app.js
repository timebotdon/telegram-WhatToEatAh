//Define modules
const TelegramBot = require('node-telegram-bot-api');
const fl = require('./lists/list_food').foodlist;
const resType = require('./lists/list_response_type');
const resNoProb = require('./lists/list_response_NoProb').responses;

//Import bot api token
const config = require('./config.json');

//Create a new polling bot instance
let bot = new TelegramBot(config.teleBotToken, {polling: true});

// Polling error watchdog
bot.on('polling_error', (error) => {
  console.log(error);
});


//Thanks
bot.onText(/thank/i, (msg) => {
  const arrayLength = resNoProb.length;
  const arrayVal = Math.floor(Math.random() * (arrayLength + 1));
  let responseText = resNoProb[arrayVal].response;
  bot.sendMessage(msg.chat.id, responseText);
});


//Bot will send message containing food data when receiving text.
//Random
bot.onText(/(I hungry|eat what|what to eat)/i, (msg) => {
  getRandomFood(function(finalName, finalType, finalCuisine){
    let arrayLength = eval("resType." + finalType + ".length");
    const arrayVal = Math.floor(Math.random() * (arrayLength + 1))
    let responseText = eval("resType." + finalType)
    bot.sendMessage(msg.chat.id, responseText[arrayVal].response + " " + finalName);
  });
});


//Filtered food request
bot.onText(/(I want| I want to eat)/i, (msg) => {
  console.log(msg.text);
  let inputArray = msg.text.toLowerCase().split(/\s/); // Splits to [ 'i', 'want', 'to', 'eat', 'something', 'cheap' ]
  //create new arrays
  let identifierArray = []; 
  let functionArray = [];

  for(item=0; item<inputArray.length; item++){
    //type filter
    if (inputArray[item] == "fastfood"){
      functionArray.push("filterByType");
      identifierArray.push("fast_food");
    }
    if (inputArray[item] == "restaurant"){
      functionArray.push("filterByType");
      identifierArray.push("casual_dining");
    }
    if ((inputArray[item] == "kopitiam") || (inputArray[item] == "hawker")){
      functionArray.push("filterByType");
      identifierArray.push("hawker");
    }
    //cuisine filter
    if (inputArray[item] == "western"){
      functionArray.push("filterByCuisine");
      identifierArray.push("western");
    }
    if (inputArray[item] == "chinese"){
      functionArray.push("filterByCuisine");
      identifierArray.push("chinese");
    }
    if (inputArray[item] == "indian"){
      functionArray.push("filterByCuisine");
      identifierArray.push("indian");
    }
    if (inputArray[item] == "thai"){
      functionArray.push("filterByCuisine");
      identifierArray.push("thai");
    }
    if (inputArray[item] == "korean"){
      functionArray.push("filterByCuisine");
      identifierArray.push("korean");
    }
    if (inputArray[item] == "japanese"){
      functionArray.push("filterByCuisine");
      identifierArray.push("japanese");
    }
    if ((inputArray[item] == "vietnamese") || (inputArray[item] == "viet")){
      functionArray.push("filterByCuisine");
      identifierArray.push("vietnamese");
    }
    if (inputArray[item] == "malay"){
      functionArray.push("filterByCuisine");
      identifierArray.push("malay");
    }
    //price filter
    if (inputArray[item] == "cheapest"){
      functionArray.push("filterByPrice");
      identifierArray.push("$");
    }
    if ((inputArray[item] == "cheaper") || (inputArray[item] == "cheap")){
      functionArray.push("filterByPrice");
      identifierArray.push("$$");
    }
    if ((inputArray[item] == "midrange") || (inputArray[item] == "mid")){
      functionArray.push("filterByPrice");
      identifierArray.push("$$$");
    }
    if (inputArray[item] == "highend"){
      functionArray.push("filterByPrice");
      identifierArray.push("$$$$");
    }
    if ((inputArray[item] == "expensive") || (inputArray[item] == "ex")){
      functionArray.push("filterByPrice");
      identifierArray.push("$$$$$");
    }
  }

  processInput(identifierArray, functionArray, function(finalName, finalType, finalCuisine){
    if (typeof finalType !== 'undefined'){
      let arrayLength = eval("resType." + finalType + ".length");
      const arrayVal = Math.floor(Math.random() * (arrayLength + 1))
      let responseText = eval("resType." + finalType)
      bot.sendMessage(msg.chat.id, responseText[arrayVal].response + " " + finalName);
    } else {
      bot.sendMessage(msg.chat.id, "Eh I can't find what you want leh. Ask again.");
    }
  });
});


// for each element in identifierArray
function processInput(identifierArray, functionArray, callback){
  if (typeof identifierArray[0] !== 'undefined'){
    const f0 = eval(functionArray[0] + "(identifierArray[0].toString())");
    const random = Math.floor(Math.random() * (f0.length)) // get random from result
    var finalName = f0[random].name;
    var finalType = f0[random].type;
    var finalCuisine = f0[random].cuisine;
    if (typeof identifierArray[1] !== 'undefined'){
      const f1 = eval(functionArray[1] + "(identifierArray[1].toString(), f0)");
      const random = Math.floor(Math.random() * (f1.length)) // get random from result
      var finalName = f1[random].name;
      var finalType = f1[random].type;
      var finalCuisine = f1[random].cuisine;
      if (typeof identifierArray[2] !== 'undefined'){
        const f2 = eval(functionArray[2] + "(identifierArray[2].toString(), f1)");
        const random = Math.floor(Math.random() * (f2.length)) // get random from result
        var finalName = f2[random].name;
        var finalType = f2[random].type;
        var finalCuisine = f2[random].cuisine;
      }
    }
  }
  return callback(finalName, finalType, finalCuisine);
}


//filter functions output filtered arrays
function filterByType(element, newArray){
  if (newArray == null){
    let filtered = fl.filter(function (el) {
      return el.type == element;
    });
    return filtered;
  } else {
    let filtered = newArray.filter(function (el) {
      return el.type == element;
    });
    return filtered;
  }
}


function filterByCuisine(element, newArray){
  if (newArray == null){
    let filtered = fl.filter(function (el) {
      return el.cuisine == element;
    });
    return filtered;
  } else {
    let filtered = newArray.filter(function (el) {
      return el.cuisine == element;
    });
    return filtered;
  }
}


function filterByPrice(element, newArray){
  if (newArray == null){
    let filtered = fl.filter(function (el) {
      return el.price == element;
    });
    return filtered;
  } else {
    let filtered = newArray.filter(function (el) {
      return el.price == element;
    });
    return filtered;
  }
}


// Get random food data from DB "test" and return value from function call.
function getRandomFood(callback){
  const randomFood = Math.floor(Math.random() * (fl.length))
  const foodKey = fl[randomFood];
  const finalName = foodKey.name;
  const finalType = foodKey.type;
  const finalCuisine = foodKey.cuisine;
  return callback(finalName, finalType, finalCuisine);
}