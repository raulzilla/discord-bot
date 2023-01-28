import { config } from "dotenv";
import Discord from "discord.js";
import configGeneral from "./config/config.js";
import travel from "./utils/travel.js";
import verifyCapsLock from "./utils/verifyCapsLock.js";
import getProfile from "./service/valorant/profile.js";
import Alert from "./components/alert.js";
import verifyRank from "./utils/verifyRank.js";
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
  if (verifyCapsLock(msg.content)) {
    msg.reply({
      content: "🚫 Desative o CapsLock! 🚫",
    });
  }

  if (msg.content === `${configGeneral.prefix} viagem`) {
    msg.reply({
      content: `Faltam ${travel()} dias para o pião de vida loka`,
    });
  }

  if (msg.content === `${configGeneral.prefix} help`) {
    msg.reply({
      content: `
      * Utilize ${configGeneral.prefix} em todos comando\n* Para ver quanto tempo falta para nossa viagem digite: /mdk viagem
    `,
    });
  }

  if (
    msg.content.includes(`${configGeneral.prefix} rank`) &&
    msg.content.includes("exemplo") === false
  ) {
    const user = msg.content.split("rank ")[1];
    const rank = `${await getProfile(user)}`.split(" -")[0];
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
  }
});

client.login(process.env.TOKEN);
