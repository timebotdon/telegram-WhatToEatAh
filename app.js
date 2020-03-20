const { MongoClient } = require('mongodb');
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');

const url = "mongodb://localhost:27017/test";
var bot = new TelegramBot(config.teleBotToken, {polling: true});

bot.onText(/(eat what|what to eat)(.+)/i, (msg) => {
  getFood(function(finalName, finalType, finalCuisine){
    bot.sendMessage(msg.chat.id, finalName + ".");
  })
});

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
