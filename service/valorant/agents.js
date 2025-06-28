import axios from "axios";

const getAgents = async () => {
  try {
    const { data, status } = await axios.get(
      `https://valorant-api.com/v1/agents`
    );

    if (status === 200) {
      return data.data.map(item => item.displayName)
    }
  } catch (e) {
    return 'Erro ao buscar agentes'
  }
};

export default getAgents;
