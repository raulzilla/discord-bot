import axios from "axios";

const getProfile = async (user) => {
  if (user && user.includes("#")) {
    try {
      const splitUser = user.split("#");
      const nick = splitUser[0];
      const id = splitUser[1];

      const { data, status } = await axios.get(
        `https://api.kyroskoh.xyz/valorant/v1/mmr/BR/${nick}/${id}?show=combo&display=1`
      );

      if (status === 200) {
        return data.replace("(BR Region)", "");
      }
    } catch (e) {
      console.log(e);
    }

    return "Você digitou algo errado, tente algo como: /mdk rank LOUD aspas#LLL";
  }

  return "Digite seu nick após a palavra rank, exemplo: /mdk rank LOUD aspas#LLL";
};

export default getProfile;
