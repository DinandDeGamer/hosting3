module.exports.run = async (client, message, args) => {

    var values = ["Head", "Coin"];

    var result = values[Math.floor(Math.random() * values.length)];

    return message.channel.send(`You have **${result}** received!`);

}

module.exports.help = {

    name: "HeadOrCoin",
    category: "general"
}