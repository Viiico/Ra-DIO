import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import fs from "fs";

async function sing(connection, botMsg) {
  while (true) {
    const player = createAudioPlayer();
    const source = createAudioResource("./commands/dio.mp3");
    player.play(source);
    console.log(source);
    const subs = connection.subscribe(player);
    let songJSON = fs.readFileSync("./commands/dio.json");
    const song = JSON.parse(songJSON);
    for (let chorus of song["lyrics"]) {
      let { time, origin, engrishu, english } = chorus;
      await sleep(time);
      botMsg.edit("```" + `${origin}\n${engrishu}\n${english}` + "```");
    }
    await sleep(13000);
    subs.unsubscribe();
  }
}
export default sing;

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
