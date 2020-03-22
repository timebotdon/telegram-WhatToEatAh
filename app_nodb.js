//Define modules
const TelegramBot = require('node-telegram-bot-api');
const fl = require('./foodlist');

//Import bot api token
const config = require('./config.json');

//Create a new polling bot instance
var bot = new TelegramBot(config.teleBotToken, {polling: true});

//Bot will send message containing food data when receiving text.
bot.onText(/(I hungry|eat what|what to eat)/i, (msg) => {
  var finalData;
  bot.sendMessage(msg.chat.id, getFood(finalData)[0] + ".");
});

// polling_error watchdog
bot.on('polling_error', (error) => {
  console.log(error);
});

// Get random food data from DB "test" and return value from function call.
function getFood(){
  const random = Math.floor(Math.random() * (fl.foodlist.length + 1))
  const randKey = fl.foodlist[random];
  const finalName = randKey.name;
  const finalType = randKey.type;
  const finalCuisine = randKey.cuisine;
  return [finalName, finalType, finalCuisine];
}