import { config } from "dotenv";
import Discord from "discord.js";
import configGeneral from "./config/config.js";
import travel from "./utils/travel.js";
import verifyCapsLock from "./utils/verifyCapsLock.js";
import getProfile from "./service/valorant/profile.js";
import Alert from "./components/alert.js";
import verifyRank from "./utils/verifyRank.js";
import feedback from "./config/feedback.js";
config();

const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  if (msg.content === `${configGeneral.prefix} help`) {
    msg.reply({
      ephemeral: false,
      embeds: [
        Alert("#FFCC00", configGeneral.help.join("\n"), {
          name: "HELP",
          iconURL: `https://cdn-icons-png.flaticon.com/512/4539/4539472.png`,
        }),
      ],
    });
  }

  if (verifyCapsLock(msg.content)) {
    msg.reply({ ephemeral: false, content: "🚫 Desative o CapsLock! 🚫" });
  }

  if (msg.content === `${configGeneral.prefix} viagem`) {
    msg.reply({
      ephemeral: false,
      content: `Faltam ${travel()} dias para o pião de vida loka`,
    });
  }

  if (
    msg.content.includes(`${configGeneral.prefix} rank`) &&
    msg.content.includes("exemplo") === false
  ) {
    const user = msg.content.split("rank ")[1];
    const rank = `${await getProfile(user)}`.split(" -")[0];

    if (verifyRank(rank).length > 0) {
      msg.reply({
        ephemeral: false,
        embeds: [
          Alert("0x0099ff", `${await getProfile(user)}`, {
            name: user,
            iconURL: `https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/${
              verifyRank(rank)[0].id
            }.png`,
          }),
        ],
      });
    } else {
      msg.reply({ ephemeral: false, content: feedback.msgError });
    }
  }
});

client.login(process.env.TOKEN);
