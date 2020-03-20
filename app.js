//Define modules
const { MongoClient } = require('mongodb');
const TelegramBot = require('node-telegram-bot-api');

//Import bot api token
const config = require('./config.json');

//define MongoDB url
const url = "mongodb://localhost:27017/test";

//Create a new polling bot instance
var bot = new TelegramBot(config.teleBotToken, {polling: true});

//Bot will send message containing food data when receiving text.
bot.onText(/(eat what ah|what to eat ah)(.+)/i, (msg) => {
  getFood(function(finalName, finalType, finalCuisine){ //finalType & finalCuisine not implemented yet.
    bot.sendMessage(msg.chat.id, finalName + ".");
  })
});

// Get random food data from DB "test" and return value from function call.
function getFood(callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("foodlist").aggregate([{ $sample: { size: 1 } }]).toArray(function(err,result){
      if (err) throw err;
      const finalName = result[0].name
      const finalType = result[0].type
      const finalCuisine = result[0].cuisine
      db.close();
      return callback(finalName, finalType, finalCuisine);
    });
  }); 
}
