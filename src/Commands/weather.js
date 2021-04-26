const axios = require('axios');
let config  = {};

module.exports = {
    init: (_config) => { config = _config; },
    show: async function (args, msg, cmds, index) {
        let city    = (args.city !== undefined && args.city !== null && args.city !== ""? args.city: "Nantes");
        let resp    = await FindWeatherOnCity(city);
        msg.channel.send({embed: {
            color: 3447003,
            title: "Perceval Météo",
            url: "https://github.com/SimonRTC/perceval",
            description: "Beaucoup moins chère qu'__Évelyne Dhéliat__, et pourtant bien plus efficace.",
            fields: [
                {
                    name: "Température",
                    value: `Température: **${resp.main.temp}°C** | Température ressentie: **${resp.main.feels_like}°C** `
                },
                {
                    name: "Vent",
                    value: `Vitesse: **${resp.wind.speed}Km/h** | Direction **${resp.wind.deg}°**`
                },
                {
                    name: "- - -",
                    value: `Minimale: **${resp.main.temp_min}°C** | Maximale: **${resp.main.temp_max}°C**`
                }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: `http://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`,
              text: "Source: OpenWeatherMap.com"
            }
          }
        });
        setTimeout(() => {
            msg.channel.send("!meteo");
            setTimeout(() => {
                msg.channel.send("... <@834713245348659220> ??");
                setTimeout(() => {
                    msg.channel.send("Minable <@834713245348659220>....");
                }, 2500);
            }, 1200);
        }, 500);
        return;
    }
};

async function FindWeatherOnCity(city) {
    let openweather = `https://api.openweathermap.org/data/2.5/weather?q=${city},FR&units=metric&appid=${config.key}`;
    let resp = null;
    try {
        const response  = await axios.get(openweather);
        resp            = response.data;
    } catch (error) {
        resp = `[ERROR] - Weather API return:\n\n\`\`\`JSON\n${JSON.stringify(error.response.data, null, 2)}\n\`\`\``;
    }
    return resp;
}