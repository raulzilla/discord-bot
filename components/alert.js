import Discord from "discord.js";

const Alert = (color, title, author, description) => {
  if (title) {
    return new Discord.EmbedBuilder()
      .setColor(color)
      .setAuthor({ name: author.name, iconURL: author.iconURL })
      .setTitle(title)
      .setDescription(description)
  }

  return new Discord.EmbedBuilder()
    .setColor(color)
    .setAuthor({ name: author.name, iconURL: author.iconURL })
    .setDescription(description)
};

export default Alert;
