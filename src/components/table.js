import Discord from "discord.js";

const Table = (color, json) => {
  return new Discord.EmbedBuilder()
    .setColor(color)
    .setTitle('👥ㅤComps\n')
    .setFields(json)
    .setTimestamp();
};

export default Table;
