module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry, you can't do this.");

    await message.channel.permissionOverwrites.set([

        {
            id: message.guild.roles.cache.find(r => r.name === "@everyone").id,
            deny: ["SEND_MESSAGES"]
        }

    ]);

    return message.channel.send("Channel is blocked.");

}

module.exports.help = {

    name: "lockdown",
    category: "general"

}