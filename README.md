# telegram-WhatToEatAh (Revision 2)
## Required modules:
* node-telegram-bot-api

## Setup (Local JSON)
1. Clone repo and `cd` into the folder:
  ```bash
  git clone https://www.github.com/timebotdon/telegram-whattoeatah
  cd telegram-whattoeatah
  ```

2. Install required modules:
  `npm install`

3. Create a new bot and retrieve the API Token. 
* More information here: https://core.telegram.org/bots

4. Define Telegram Bot API token in `config.json`. The bot API token must be acquired from the Botfather bot.

5. Run script.
  `node app_nodb.js`

## Setup (MongoDB)(DEFUNCT)
Note that the MongoDB version will NOT be included in future revisions(r2+) as it is overkill for the scale of this project.. for now.
### Requirements
* Existing MongoDB installation.

1. Clone repo and `cd` into the folder:
  ```bash
  git clone https://www.github.com/timebotdon/telegram-whattoeatah
  cd telegram-whattoeatah
  ```

2. Install required modules:
  `npm install`
  `npm install mongodb`

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
* Text the bot `what to eat ah` or `eat what ah` via telegram. The response will include a randomized food suggestion derived from the JSON list/mongoDB database.
* Text the bot `I want to eat` or `I want` to specify a filtered response. eg: `I want to eat cheaper korean fastfood` I will result in a response falling within those 3 categories (price, cuisine, foodtype) more explained on next section.

### Responses
#### Food type
Food responses are now food type specific. Refer to `./lists/list_response_type.json`.
#### Price
This will be implemented to include price specific as well. Refer to `./lists/list_response_price.json`.
The end goal is to send a randomized response between both categories. 

#### "Thanks" repsonses
The bot will now repond to "Thank you" messages with a randomized message. Refer to `./lists/list_response_NoProb.json`.

### Input Filters
Accepted inputs. Refer to `./lists/list_food.json` for specifications. All inputs are case insensitive.

#### Foodtype
1. fast_food - Message text: "fast food"
2. casual_dining  - Message text: "restaurant"
3. hawker - Message text: "hawker" or "kopitiam"

#### Cuisine
1. Chinese
2. Malay
3. Indian
4. Western
5. Korean
6. Japanese
7. Taiwanese
8. Thai
9. Vietnamese
10. Multi (peranakan, mixed cuisines)

#### Price
1. $ - message text: "cheapest"
2. $$ - message text: "cheaper" or "cheap"
3. $$$ - message text: "midrange" or "mid"
4. $$$$ - message text: "highend"
5. $$$$$ - message text: "expensive" or "ex"

# Bugs
Yep theres still many bugs to fix at this point...

## Future Features 
Features in plan

### rev3
#### Categories
* Vegetarian/Vegan
* Halal / non halal

#### Location
* Location linking via Google Places API
* Restaurant/Venue recommendation via Google Places API