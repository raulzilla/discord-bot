import axios from "axios";
import feedback from "./../../config/feedback.js";

const getProfile = async (user) => {
  const isUser = user.includes("#")
  if (user && isUser) {
    try {
      const splitUser = user.split("#");
      const nick = splitUser[0];
      const id = splitUser[1];

      const { data, status } = await axios.get(
        `https://api.kyroskoh.xyz/valorant/v1/mmr/BR/${nick}/${id}?show=combo&display=1`
      );

      if (status === 200) {
        return data.split(": ")[1];
      }

      if (status === 400) {
        return feedback.msgError;
      }
    } catch (e) {
      return feedback.msgError;
    }
  }

  return "Digite seu nick completo após a palavra rank, exemplo: /mdk rank LOUD aspas#LLL";
};

export default getProfile;
