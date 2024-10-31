import Discord from "discord.js";

const Alert = (color, title, author) => {
  return new Discord.EmbedBuilder()
    .setColor(color)
    .setAuthor({
      name: author.name,
      iconURL: author.iconURL,
    })
    .setTitle(title);
};

export default Alert;
