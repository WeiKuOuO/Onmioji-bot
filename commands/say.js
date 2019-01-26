var discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    if(args[0] == 'green', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        const text = args.slice(1).join(" ")
        message.delete().catch(O_o=>{});
        message.channel.send({embed: {
            description: (text),
            color: 0x00FF04,
         }})
    });
}
module.exports.help = {
  name: "say",
};