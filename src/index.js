import { config } from "dotenv";
import Discord from "discord.js";
import prefix from "./config/prefix.js";
import travel from "./utils/travel.js";
import verifyCapsLock from "./utils/verifyCapsLock.js";
import getProfile from "./service/valorant/profile.js";
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
    msg.channel.send("🚫 Desative o CapsLock! 🚫");
  }

  if (msg.content === `${prefix} viagem`) {
    msg.channel.send(`Faltam ${travel()} dias para o pião de vida loka`);
  }

  if (msg.content === `${prefix} help`) {
    msg.channel.send(`
      * Utilize ${prefix} em todos comando\n* Para ver quanto tempo falta para nossa viagem digite: /mdk viagem
    `);
  }

  if (
    msg.content.includes(`${prefix} rank`) &&
    msg.content.includes("exemplo") === false
  ) {
    const user = msg.content.split("rank ")[1];
    msg.channel.send(`${await getProfile(user)}`);
  }
});

client.login(process.env.TOKEN);
