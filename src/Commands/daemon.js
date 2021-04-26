let config = {};

module.exports = {
    init: (_config) => { config = _config; },
    help: (args, msg, cmds, index) => {
        let message = "**Liste des commandes**\n\n";
        message += "__Structure de la commande: **{prefix}{commande}** {arg1: type}, {arg2: type}, {arg3: type}, [...]__\n\n";
        cmds.commands.forEach((command) => {
            let args = '';
            command.args.forEach((arg) => {
                args += ` {${arg.display}: ${arg.type}}`;
            });

            message += `- \`\`${cmds.prefix}${command.cmd}${args}\`\` >> ${command.display}\n`;
        });
        message += "\n **Veuillez noter que les tests unitaires sont encours de rédaction par <@761691490476228651>, en cas de problème avec le bot retournez-vous vers lui.** \n";
        msg.delete();
        msg.reply(message);
    },
    say: function (args, msg, cmds, index) {
        let message = msg.content.split(`${cmds.prefix}${cmds.commands[index].cmd}`);
        message     = (message[1] !== undefined && message !== ""? message[1]: null);
        if (message !== null) {
            msg.delete();
            msg.channel.send(message);
            return;
        }
    }
};