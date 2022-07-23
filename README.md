# DiscordInvites API

### Installation & configuration : 
1️⃣Install API module with the following command : `npm i discordinvites_api`

2️⃣Create file `index.js` & enjoy ! : 
```js
const api = require('discordinvites_api');

// Init api 
api.init("YOUR_API_KEY");

// Get servers information
let server = await api.getServerInformation("GUILD_ID");
let user = await api.getUserInformation("USER_ID");
```
