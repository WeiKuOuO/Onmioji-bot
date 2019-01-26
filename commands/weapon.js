const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(args[1] == "list"){
        message.channel.send('hi ghostblade1')
    }
    if(args[1] == "ghostblade1"){
        message.channel.send('https://i.imgur.com/13mrLGm.png')
    }


}

module.exports.help = {
    name: "weapon",
}




