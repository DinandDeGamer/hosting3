module.exports.run = async (client, message, args) => {

    // !clear aantal

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("You do not have access to this command.");

    if (!args[0]) return message.reply("Enter a number that you want to take away.");

    if (parseInt(args[0])) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (parseInt(args[0]) === 1) {

                message.channel.send("I deleted 1 message.").then(msg => {

                    setTimeout(() => {

                        msg.delete();

                    }, 3000);
                });

            } else {
                message.channel.send(`I deleted ${parseInt(args[0])} messages.`).then(msg => {

                    setTimeout(() => {

                        msg.delete();

                    }, 3000);
                });


            }

        }).catch(err => {

            return message.reply("Enter a number greater than 0.")

        });

    } else {
        return message.reply("Enter a number.");
    }

}

module.exports.help = {

    name: "clear",
    category: "general"

}