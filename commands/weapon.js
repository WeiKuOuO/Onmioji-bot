const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(args[0] == "list"){
        message.channel.send("test")
    }

    if(args[0] == "ghostblade1"){
        message.channel.send("https://i.imgur.com/13mrLGm.png")
    }
    
    


}

module.exports.help = {
    name: "weapon",
}




