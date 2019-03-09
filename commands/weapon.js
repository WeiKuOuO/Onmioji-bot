const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const weapon_list = new Discord.RichEmbed()
      .setAuthor(bot.user.username)
      .setTitle("武器列表")
      .setColor("RANDOM")
      .setDescription("")
      .addField("武器名稱",`\`\`\`diff\n計算中...\`\`\``, true)
      .addField("代碼比對",`\`\`\`xl\n計算中...\`\`\``, true)

    message.channel.send(weapon_list)

    if(args[0] == "list"){
        message.channel.send(weapon_list)
    }

    if(args[0] == "ghostblade1"){
        message.channel.send("https://i.imgur.com/13mrLGm.png")
    }
    
    


}

module.exports.help = {
    name: "weapon",
}




