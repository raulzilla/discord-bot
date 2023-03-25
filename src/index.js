import { config as CONFIG } from "dotenv";
import Discord from "discord.js";
import config from "./config/config.js";
import travel from "./utils/travel.js";
import verifyCapsLock from "./utils/verifyCapsLock.js";
import getProfile from "./service/valorant/profile.js";
import Alert from "./components/alert.js";
import verifyRank from "./utils/verifyRank.js";
import feedback from "./config/feedback.js";
import connectToChannel from "./utils/connectToChannel.js";
import youtubedl from 'youtube-dl-exec'
import {
  createAudioResource,
  createAudioPlayer,
  NoSubscriberBehavior
} from "@discordjs/voice";
CONFIG();

const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  if (msg.content === `${config.prefix} help`) {
    msg.reply({
      ephemeral: false,
      embeds: [
        Alert("#FFCC00", config.help.join("\n"), {
          name: "HELP",
          iconURL: `https://cdn-icons-png.flaticon.com/512/4539/4539472.png`,
        }),
      ],
    });
  }

  if (verifyCapsLock(msg.content)) {
    msg.reply({ ephemeral: false, content: "🚫 Desative o CapsLock! 🚫" });
  }

  if (msg.content === `${config.prefix} viagem`) {
    msg.reply({
      ephemeral: false,
      content: `Faltam ${travel()} dias para o pião de vida loka`,
    });
  }

  if (msg.content.includes(`${config.prefix} music`)) {
    const channel = msg.member?.voice.channel;
    const music = msg.content.split('music')[1]

    if (channel) {
      try {
        const connection = await connectToChannel(channel);
        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Play
          }
        });
        connection.subscribe(player);

        const yt = await youtubedl(music, { dumpSingleJson: true })

        const resource = createAudioResource(yt.requested_formats[1].url)
        player.play(resource)
      } catch (error) {
        console.log('test')
        throw error;
      }
    }
  }

  if (
    msg.content.includes(`${config.prefix} rank`) &&
    msg.content.includes("exemplo") === false
  ) {
    try {
      const user = msg.content.split("rank ")[1];
      const rank = `${await getProfile(user)}`.split(" -")[0];

      if (verifyRank(rank).length > 0) {
        msg.reply({
          ephemeral: false,
          embeds: [
            Alert("0x0099ff", `${await getProfile(user)}`, {
              name: user,
              iconURL: `https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/${verifyRank(rank)[0].id
                }.png`,
            }),
          ],
        });
      } else {
        msg.reply({ ephemeral: false, content: feedback.msgError });
      }
    } catch (e) {
      msg.reply({ ephemeral: false, content: e });
    }
  }
});

client.login(process.env.TOKEN);
