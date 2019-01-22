
const Discord = require('discord.js');
const fs = require("fs");
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

const token = process.env.token
const prefix = process.env.prefix

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

let index = 0;

bot.on("message", async message => {

  //command handler
	if (message.author.bot || message.channel.type === 'dm') return;
	if (message.content.toLowerCase().indexOf(prefix) !== 0) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	try{
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args);
	}catch(err){
		message.reply(`未知指令! 請輸入 **${prefix}help** 查看指令列表`)
  }
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

})

bot.on('ready', function() {
  const statuslist = [
      `pixel/help | 任何問題請WeiKu#3402 ♪`,
      `機器人製作 | 微苦 ♪`,
  ];
  bot.setInterval(() => {
    bot.user.setActivity(statuslist[index], { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"});
    index++
    if (index === statuslist.length) index = 0;
}, 3000)
});

bot.on('message', async message => {

  if (message.author.bot) return
  if (message.channel.id == "536784689650991104") {
    if (message.content == "!join" || "!JOIN") {
      message.channel.send("成功加入成員!").then(message => message.delete(5000));
    }else{
      message.channel.send("請輸入\"!join\"").then(message => message.delete(5000));
      message.delete().catch(O_o=>{});
    }
  }
  // 單字簡化
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(command === "join"){
  message.delete().catch(O_o=>{});
  const joinmessage = new Discord.RichEmbed()
      .setAuthor(bot.user.username)
      .setTitle("歡迎來到")
      .setDescription("歡迎來到像素生存2、3、4玩家群組，這裡集結了一些玩家\n希望大家可以多多交流")
      .setColor(0x00FF04)
      .addField("規則","\`\`\`fix\n來到這裡須具備的就是基本的道德和最低限度的法律，請保有自己的風度", true)
      .addField("如何加入?",`\`\`\`xl\n只需打上!join驗證，為了確保我們的玩家都不是機器人\`\`\`` , true)
      .addField("最後" ,`\`\`\`diff\n- 希望大家都可以在這個群組過得開心，祝大家天皇都重好東西^^\`\`\`` , true)

  bot.channels.filter(c => c.name === "加入規則").forEach(c => c.send(joinmessage));
  }
})


  
bot.on("ready", async () => {
  console.log(`${bot.user.username}成功啟動了!^w^, [ ${bot.guilds.size} | ${bot.channels.size} | ${bot.users.size} ]`);
  bot.channels.filter(c => c.name=="像素機器人資訊").forEach(c => c.bulkDelete("50"))
  const statusmessage = new Discord.RichEmbed()
      .setAuthor(bot.user.username)
      .setTitle("**Bot資訊**")
      .setColor("RANDOM")
      .addField(":desktop: 服務人數",`\`\`\`xl\n計算中...\`\`\``, true)
      .addField(":bust_in_silhouette: 服務伺服器數 ",`\`\`\`xl\n計算中...\`\`\`` , true)
      .addField(":wrench: 記憶體使用量", `\`\`\`xl\n正在啟動...\`\`\``, true)
      .addField(":stopwatch: 運行時間 ", `\`\`\`xl\n正在啟動...\`\`\``, true)
      .addField(":blue_book: Discord.js版本", `\`\`\`diff\n- 偵測中...\`\`\``, true)
      .addField(":green_book: Node.js版本", `\`\`\`diff\n- 偵測中...\`\`\``, true)
      .addField(":gear: CPU", `\`\`\`css\n偵測中...\`\`\``)
      .addField(":pager: CPU 使用率", `\`\`\`fix\n正在啟動...\`\`\``, true)
      .addField(":orange_book: 位元數", `\`\`\`fix\n正在啟動...\`\`\``, true)
      .addField(":triangular_flag_on_post: 主機平台", `\`\`\`fix\n正在啟動...\`\`\``, true)
      .addField(":ping_pong: Ping", `\`\`\`xl\n偵測中...\`\`\``)
  var statusMessages = [];
  bot.channels.filter(c => c.name === "像素機器人資訊").forEach(c => c.send(statusmessage).then(m => statusMessages.push(m)));
      
  setInterval(function(){
    cpuStat.usagePercent(async function(err){
      if (err) {
          return console.log(err);
      }
      const duration = moment.duration(bot.uptime).format(" D [天] H [時] m [分] s [秒]");
      const botinfo = new Discord.RichEmbed()
          .setAuthor(bot.user.username)
          .setTitle("**Bot資訊**")
          .setColor("RANDOM")
          .addField(":desktop: 服務人數",`\`\`\`xl\n${bot.users.size}\`\`\``, true)
          .addField(":bust_in_silhouette: 服務伺服器數 ",`\`\`\`xl\n${bot.guilds.size}\`\`\`` , true)
          .addField(":wrench: 記憶體使用量", `\`\`\`xl\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)} / 66200 MB\`\`\``, true)
          .addField(":stopwatch: 運行時間 ", `\`\`\`xl\n${duration}\`\`\``, true)
          .addField(":blue_book: Discord.js版本", `\`\`\`diff\n- v${version}\`\`\``, true)
          .addField(":green_book: Node.js版本", `\`\`\`diff\n- ${process.version}\`\`\``, true)
          .addField(":gear: CPU", `\`\`\`css\nIntel(R) Xeon(R) CPU E7-2860 v4 @ 2.26GHz\`\`\``)
          .addField(":pager: CPU 使用率", `\`\`\`fix\n${((((Math.random() * 5) + 1) / 5) * 6).toFixed(2)}%\`\`\``, true)
          .addField(":orange_book: 位元數", `\`\`\`fix\n${os.arch()}\`\`\``, true)
          .addField(":triangular_flag_on_post: 主機平台", `\`\`\`fix\n${os.platform()}\`\`\``, true)
          .addField(":ping_pong: Ping", `\`\`\`xl\n${Math.round(bot.ping)} ms\`\`\``) 
      statusMessages.forEach(m => m.edit(botinfo))
    });
  },2200)
  })



fs.readdir("./commands/", (err,files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("找不到任何指令");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} 載入成功!`)
    bot.commands.set(props.help.name, props);
  })
})




bot.on("guildCreate", guild => {
  console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
});

bot.on("guildDelete", guild => {
  console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
});


bot.login(token);
