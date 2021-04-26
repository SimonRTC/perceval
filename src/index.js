const Discord   = require('discord.js');
const fs        = require('fs');
const client    = new Discord.Client();

let config      = JSON.parse(fs.readFileSync('./conf/discord.json'));
let cmds        = JSON.parse(fs.readFileSync('./conf/commands.json'));

cmds.commands.forEach((command, index) => {
    try {
        let common                      = command.common.split("::");
        const handler                   = require(`./Commands/${common[0]}.js`);
        cmds.commands[index].handler    = handler[common[1]];
        handler.init((config.commands[common[0]] !== undefined? config.commands[common[0]]: {}));
    } catch (err) {
        console.error(err);
    }
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("kaamelott", { type: "STREAMING", url: "https://www.twitch.tv/relaxbeats" });
    client.on('message', (msg) => {
        cmds.commands.forEach((command, index) => {
            let args = msg.content.split(" ");
            if (args[0] == `${cmds.prefix}${command.cmd}`) {
                args.splice(0, 1);
                command.handler(GetParsedArgs(command.args, args), msg, cmds, index);
            }
        });
    });
});

client.login(config.token);

function GetParsedArgs(MasterArgs, _args) {
    let args = {};
    MasterArgs.forEach((MasterArg, index) => {
        if (_args[index] !== undefined) {
            args[MasterArg.name] = _args[index];
        }
    });
    return args;
}