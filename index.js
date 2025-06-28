import { config as CONFIG } from "dotenv";
import Discord from "discord.js";
import config from "./config/config.js";
import verifyCapsLock from "./utils/verifyCapsLock.js";
import getProfile from "./service/valorant/profile.js";
import getComps from "./service/valorant/comps.js";
import getAgents from "./service/valorant/agents.js";
import Alert from "./components/alert.js";
import Table from "./components/table.js";
import verifyRank from "./utils/verifyRank.js";
import feedback from "./config/feedback.js";
import express from 'express';

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
        Alert("#FFCC00", false, {
          name: "HELP",
          iconURL: `https://cdn-icons-png.flaticon.com/512/4539/4539472.png`,
        }, config.help.join("\n")),
      ],
    });
  }

  if (verifyCapsLock(msg.content)) {
    msg.reply({ ephemeral: false, content: "🚫 Desative o CapsLock! 🚫" });
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
            Alert("#0099FF", getUser, {
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

  if (msg.content.includes(`${config.prefix} sort comp`)) {
    const agents = await getAgents()

    function sort5Items() {
      const indexs = new Set();

      Array.from({ length: agents.length * 3 }).forEach(() => {
        const index = Math.round(Math.random() * (agents.length - 1));
        indexs.add(index);
      });

      if (indexs.size < 5) {
        Array.from({ length: agents.length }).forEach(() => {
          if (indexs.size < 5) {
            const index = Math.round(Math.random() * (agents.length - 1));
            indexs.add(index);
          }
        });
      }
      const indexsFinal = Array.from(indexs).slice(0, 5);

      return indexsFinal.map(i => agents[i]);
    }

    msg.reply({ ephemeral: false, content: `Agentes sorteados 🎲: ${sort5Items().join(', ')}` });
  }
});

client.login(process.env.TOKEN);

const app = express();

app.get('/', (_, res) => {
  res.send('Bot está rodando!');
});

app.listen(3000);