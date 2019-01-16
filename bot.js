const Discord = require("discord.js");
const client = new Discord.Client();


var user = {};
var warn = {};

client.on('message', async message =>{
  if (message.author.id == client.user.id) return;
  if(JSON.stringify(user).indexOf(message.author.id) == -1) {
    user[message.author.id] = message.createdTimestamp;
    return;
  } else {
    if (Date.now() - user[message.author.id] < 1000){
      if (JSON.stringify(warn).indexOf(message.author.id) == -1) {
        warn[message.author.id] = 1;
      } else {
        warn[message.author.id]++;
      }
      if (warn[message.author.id] < 3) {
         message.channel.send({embed: {
      title: "Muted a user:",
      description: `<@${message.author.id}> please stop spamming, **${warn[message.author.id]}** warning!`,
      color: 16000000
    }});
      }
      delete user[message.author.id];
    } else {
      delete user[message.author.id];
    }
  }
  if (warn[message.author.id] == 3) {
     
       let muterole = message.guild.roles.find(`name`, "muted");
    //start of create role
    if(!muterole){ 
      try{
        muterole = await message.guild.createRole({
          name: "muted",
          color: "#000000",
          permissions:[]
        }) 
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        }); 
      }catch(e){ 
        console.log(e.stack);
      } 
    }
    
client.login(process.env.BOT_TOKEN);
