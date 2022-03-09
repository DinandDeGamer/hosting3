module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.reply("Please sps <stone, paper, scissors>.");

    var options = ["stone", "paper", "scissors"];

    var result = options[Math.floor(Math.random() * options.length)];

    switch (args[0].toUpperCase()) {

        case "STONE":

            switch (result) {

                case "stone":

                    return message.channel.send(`Ik heb ${result} 🗿, het is gelijkspel.`);

                    break;

                case "paper":

                    return message.channel.send(`Ik heb ${result} 🗒, ik win.`);

                    break;

                case "scissors":

                    return message.channel.send(`Ik heb ${result} ✂, jij wint.`);

                    break;
            }

            break;

        case "PAPER":


            switch (result) {

                case "stone":

                    return message.channel.send(`Ik heb ${result} 🗿, jij wint.`);

                    break;

                case "paper":

                    return message.channel.send(`Ik heb ${result} 🗒, het is gelijkspel.`);

                    break;

                case "scissors":

                    return message.channel.send(`Ik heb ${result} ✂, ik win.`);

                    break;
            }

            break;

        case "SCISSORS":



            switch (result) {

                case "stone":

                    return message.channel.send(`Ik heb ${result} 🗿, ik win.`);

                    break;

                case "paper":

                    return message.channel.send(`Ik heb ${result} 🗒, jij wint.`);

                    break;

                case "scissors":

                    return message.channel.send(`Ik heb ${result} ✂, het is gelijkspel.`);

                    break;
            }

            break;

        default:

            return message.channel.send("Please use stone paper or scissors.");

    }

}

module.exports.help = {

    name: "sps",
    category: "general"

}