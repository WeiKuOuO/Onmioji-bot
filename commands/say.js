var figlet = require('figlet');

module.exports.run = (bot, message, args, tools) => {
    if (args[0] == green){
        const text = args.slice(1).join(" ")
        message.delete().catch(O_o=>{});
        message.channel.send({embed: {
            description: (text),
            color: 0x00FF04,
         }})
    }
}
module.exports.help = {
  name: 'say',
};