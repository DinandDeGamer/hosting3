const botConfig = require("../botConfig.json");

module.exports.run = async (client, message) => {

    try {

        var prefix = botConfig.prefix;

        var respone = "**Bot commands**\r\n\n";
        var general = "**__General__**\r\n";
        var info = "**__Info__**\r\n";
        
        client.commands.forEach(command => {

            switch (command.help.category) {

                case "general":
                    general += `${prefix}${command.help.name}\r\n`;
                    break;

                case "info":
                    info += `${prefix}${command.help.name}\r\n`;
                    break;

            }

        });

        respone += general + info;

        message.author.send(respone).then(() => {

            return message.reply("All commands can be found in your private messages.");

        }).catch(() => {

            return message.reply("Your private messages are off!");

        })

    } catch (error) {
        message.reply("Something went wrong.");
    }

}

module.exports.help = {

    name: "help",
    category: "info"

}