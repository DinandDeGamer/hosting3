module.exports.run = async (client, message, args) => {

    var number = Math.ceil(Math.random() * 6);

    return message.channel.send(`You threw **${number}** 🎲`);

    

}

module.exports.help = {

    name: "dice",
    category: "general"

}