//Define modules
const { MongoClient } = require('mongodb');
const TelegramBot = require('node-telegram-bot-api');

//Import bot api token
const config = require('./config.json');

//define DB name
const dbName = "fooddb";
//define Collection name
const collectionName = "foodlist";
//define MongoDB url
const url = "mongodb://localhost:27017/" + dbName;

//Create a new polling bot instance
var bot = new TelegramBot(config.teleBotToken, {polling: true});

//Bot will send message containing food data when receiving text.
bot.onText(/(eat what|what to eat)/i, (msg) => {
  getFood(function(finalName, finalType, finalCuisine){ //finalType & finalCuisine not implemented yet.
    bot.sendMessage(msg.chat.id, finalName + ".");
  })
});

// polling_error watchdog
bot.on('polling_error', (error) => {
  console.log(error);
});

// Get random food data from DB "test" and return value from function call.
function getFood(callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection(collectionName).aggregate([{ $sample: { size: 1 } }]).toArray(function(err,result){
      if (err) throw err;
      const finalName = result[0].name
      const finalType = result[0].type
      const finalCuisine = result[0].cuisine
      db.close();
      return callback(finalName, finalType, finalCuisine);
    });
  }); 
}