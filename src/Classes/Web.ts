import * as express from "express";
import { WEB } from "../constants";
import STRINGS from "../strings";
import CustomClient from "./Client";

class Web {
    server = express();
    bot: CustomClient;

    constructor(bot: CustomClient) {
        this.bot = bot;
        this.server.listen(WEB.PORT, WEB.INTERFACE, () => {
            this.bot.logger.info(STRINGS.WEB.ONLINE);
        });

        this.server.get("/", (req, res) => {
            res.send(`
<head><title>${bot.user?.tag} status</title></head>
<body>
<h1>${bot.user?.tag} status</h1>
<p>
Websocket ping: ${bot.ws.ping}
<br/>
Uptime: ${bot.uptime}
</p>
</body>`);
        });
    }
}

export default Web;
