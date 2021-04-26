const axios = require('axios');
let config  = {};

module.exports = {
    init: (_config) => { config = _config; },
    weekend: async (args, msg) => {
        let gif = await GetTenorGif("weekend");
        if (gif !== null) {
            msg.channel.send(gif.url);
            return;
        }
        msg.reply("Error! (Tenor API response)");
        return;
    }
};

async function GetTenorGif(keywords, limit) {
    let tenor   = `https://g.tenor.com/v1/search?q=${keywords}&key=${config.token}&limit=12`;
    let resp    = null;
    try {
        const response  = await axios.get(tenor);
        resp            = response.data.results;
        resp            = (resp !== null && resp[Math.floor(Math.random() * 10)] !== undefined ? resp[Math.floor(Math.random() * 10)]: null);
    } catch (error) {
        console.error(error);
    }
    return resp;
}