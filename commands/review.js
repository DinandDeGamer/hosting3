const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // !review anntal bricht bricht bricht

    const amountStars = args[0];

    if (!amountStars || amountStars < 1 || amountStars > 5) return message.reply("Give a star between 1 and 5.");

    const messageReview = args.splice(1, args.length).join(" ") || '**Do not give a message.**';

    const reviewChannel = message.member.guild.channels.cache.get("951035271850369024");

    if (!reviewChannel) return message.reply("Channel not found.");

    var stars = "";

    for (var i = 0; i < amountStars; i++) {

        stars += ":star: ";

    }

    message.delete();

    const review = new discord.MessageEmbed()
        .setTitle(`${message.author.username} has written a review! 🎉`)
        .setColor("#00ff00")
        .setThumbnail("https://imgur.com/W45xcnA.png")
        .addField("Stars:", `${stars}`)
        .addField("Review:", `${messageReview}`);

    message.channel.send("✅ You've made a review. 🌐")

    return reviewChannel.send({ embeds: [review] });

}

module.exports.help = {

    name: "review",
    category: "info"
}