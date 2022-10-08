import { config } from "dotenv";
import { Client } from "discord.js";
import { joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";
import fs from "node:fs";
config();

import sing from "./commands/dio.js";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
});
let data = {};
client.on("messageCreate", async (msg) => {
  if (msg.author.bot || msg.author?.system) return;
  if (msg.author.id != "621692383582486558") return;
  if (!msg.content.includes("dio")) return;

  let channel = msg.member?.voice?.channel;
  const botMsg = await msg.channel.send("Kono dio da!");
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  await sing(connection, botMsg);

  // let historyChannelId = msg.channelId;
  // let historyChannel = client.channels.cache.get(historyChannelId);
  // let message = await historyChannel.messages
  //   .fetch({ limit: 1 })
  //   .then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));
  // let i = 0;
  // while (message) {
  //   try {
  //     // if(i==1)break;
  //     botMsg.edit(`fetching messages: ${i}`);
  //     await historyChannel.messages
  //       .fetch({ limit: 100, before: message.id })
  //       .then((messagePage) => {
  //         messagePage.forEach(async (msg) => {
  //           if (!msg.content) return;
  //           console.log(i);
  //           i++;
  //           if (msg.type != 19 || msg.author.bot) return;
  //           try {
  //             const resMsg = await historyChannel.messages?.fetch(
  //               msg.reference.messageId
  //             );
  //             if (msg.author.id == resMsg.author.id) return;
  //             if (!data?.[msg.author.username])
  //               data[msg.author.username] = {
  //                 id: msg.author.id,
  //                 messages: [],
  //               };
  //             data[msg.author.username].messages.push({
  //               msg: msg.content,
  //               context: resMsg.content,
  //             });
  //           } catch (err) {
  //             console.error(err);
  //           }
  //         });
  //         // Update our message pointer to be last message in page of messages
  //         message =
  //           0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
  //       });
  //   } catch (err) {
  //     console.log(i);
  //     console.error(err);
  //   }
  // }
  // let toWrite = JSON.stringify(data, null, 2);
  // fs.writeFile("data.json", toWrite, (err) => {
  //   if (err) throw err;
  //   botMsg.edit("これで終わりです");
  // });
});

client.once("ready", () => console.log("ready"));

client.login(process.env.RADIO_BOT_TOKEN);

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
