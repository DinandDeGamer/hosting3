const { Client, Intents, Collection } = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");
const swearWords = require("./Data/swearWords.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`De file ${command.help.name}.js is ingeladen`)

}

client.once("ready", () => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity("Test", { type: "PLAYING" })

    const statusOptions = [
        "Hallo 🙌",
        "Hey 📲",
        "Yo 😎"
    ]

    let counter = 0;

    let time = 3 * 1000; // 1 Minuut

    const updateStatus = () => {

        client.user.setPresence({

            status: "online",
            activities: [

                {

                    name: statusOptions[counter]

                }

            ]

        });

        if (++counter >= statusOptions.length) counter = 0;

        setTimeout(updateStatus, time);

    }

    updateStatus();

});

client.on("interactionCreate", interaction => {

    if (!interaction.isSelectMenu()) {

        return;

    }

    const { customId, values, member } = interaction;

    if (customId === 'roles') {

        const component = interaction.component;

        const removed = component.options.filter((option) => {

            return !values.includes(option.value)

        });

        for (var id of removed) {

            member.roles.remove(id.value)

        }

        for (var id of values) {

            member.roles.add(id)

        }

        interaction.reply({

            content: "Rollen geupdate!",

            ephemeral: true

        })

    }

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get("943165238067474463");

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get("942839046139432972");

    if (!channel) return;

    channel.send(`Welkom op de server, ${member}`);

})

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) {

        var msg = message.content.toLowerCase();

        for (let index = 0; index < swearWords.length; index++) {
            const swearWord = swearWords[index];


            if (msg.includes(swearWord.toLowerCase())) {

                message.delete();

                return await message.channel.send("Je mag niet schelden!").then(msg => {

                    setTimeout(() => {
                        msg.delete()
                    }, 3000);

                })

            }

        }

    } else {

        const commandData = client.commands.get(command.slice(prefix.length))

        if (!commandData) return;

        var arguments = messageArray.slice(1);

        try {

            await commandData.run(client, message, arguments);

        } catch (error) {

            console.log(error);
            await message.reply("Er is iets fout gegaan met het commando.")

        }

    }

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {

        console.log(error);
        await message.reply("Er is iets fout gegaan met het commando.")

    }


});

client.login(process.env.token);