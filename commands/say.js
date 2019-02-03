var discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    if(args[0] == "green"){
        const text = args.slice(0).join(" ")
        message.delete().catch(O_o=>{});
        message.channel.send({embed: {
            description: (text),
            color: 0x00FF04,
         }})
    }
    console.log(args)
}

module.exports.help = {
  name: "say",
}