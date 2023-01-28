const travel = () => {
  const day = 15;
  const month = 12;
  const year = 23;
  const travelDate = new Date([month, day, year]);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - travelDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default travel;
