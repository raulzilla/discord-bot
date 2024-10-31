import { config as CONFIG } from "dotenv";
import Discord from "discord.js";
import config from "./config/config.js";
import travel from "./utils/travel.js";
import verifyCapsLock from "./utils/verifyCapsLock.js";
import getProfile from "./service/valorant/profile.js";
import getComps from "./service/valorant/comps.js";
import Alert from "./components/alert.js";
import Table from "./components/table.js";
import verifyRank from "./utils/verifyRank.js";
import feedback from "./config/feedback.js";

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

  if (
    msg.content.includes(`${config.prefix} rank`) &&
    msg.content.includes("exemplo") === false
  ) {
    try {
      const user = msg.content.split("rank ")[1];
      const getUser = `${await getProfile(user)}`
      const rank = getUser.split(" -")[0];

      if (verifyRank(rank).length > 0) {
        msg.reply({
          ephemeral: false,
          embeds: [
            Alert("0x0099ff", `${getUser}`, {
              name: user,
              iconURL: `https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/${verifyRank(rank)[0].id}.png`,
            }),
          ],
        });
        return;
      } else {
        msg.reply({ ephemeral: false, content: feedback.msgError });
      }
    } catch (e) {
      msg.reply({ ephemeral: false, content: e });
    }
  }

  if (msg.content.includes(`${config.prefix} comps`)) {
    const messages = await msg.channel.messages.fetch();
    const botAndMdkMessages = messages.filter(
      m => (m.author.id === msg.client.user.id || m.content.includes(config.prefix))
    );

    botAndMdkMessages.delete(botAndMdkMessages.firstKey());

    await msg.channel.bulkDelete(botAndMdkMessages, true).catch(console.error);

    const comps = await getComps();
    msg.reply({
      ephemeral: false,
      embeds: [
        Table("#f04d59", comps),
      ],
    });
  }
});

client.login(process.env.TOKEN);
