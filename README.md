# telegram-WhatToEatAh
## Required modules:
* node-telegram-bot-api
* mongodb

## Setup:
1. Clone repo and cd into the folder:
  ```bash
  git clone https://www.github.com/timebotdon/telegram-whattoeatah
  cd telegram-whattoeatah
  ```

2. Install required modules:
  `npm install`

3. Set up mongoDb
a. Create a new database - example used in app.js is "test".
b. Create a new collection in database - example used is "foodlist"
c. Import all entries of "foodlist.json" into the db.

3. Define Telegram Bot API token, in config.json. The bot API token must be acquired from the Botfather bot. More information here:
https://core.telegram.org/bots
  
4. Run the script.
  `node app.js`

## Bot interaction
The bot can be interacted by sending the following messages "what to eat ah" or "eat what ah". The response will include a randomized food suggestion derived from the mongoDB database.