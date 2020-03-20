# telegram-WhatToEatAh
## Required modules:
* node-telegram-bot-api
* mongodb

## Setup
1. Clone repo and `cd` into the folder:
  ```bash
  git clone https://www.github.com/timebotdon/telegram-whattoeatah
  cd telegram-whattoeatah
  ```

2. Install required modules:
  `npm install`

3. Set up MongoDb
* Create a new database - example used is `test`.
* Create a new collection in database - example used is `foodlist`
* Import all entries of `foodlist.json` into the database.

4. Create a new bot and retrieve the API Token. 
* More information here: https://core.telegram.org/bots

5. Define Telegram Bot API token in `config.json`. The bot API token must be acquired from the Botfather bot.

6. Run script.
  `node app.js`

## Bot interaction
* Text the bot `what to eat ah` or `eat what ah` via telegram. The response will include a randomized food suggestion derived from the mongoDB database.