export const compare = (date1, date2) => {
  return new Date(date1).getMonth() - new Date(date2).getMonth();
};

export const dateDisplay = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.toLocaleString('default', { day: 'numeric' });
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const year = dateObj.toLocaleString('default', { year: 'numeric' });
  return `${day} ${month}, ${year} year`;
};

export const getMonth = (date) => {
  return new Date(date).toLocaleString('default', { month: 'long' });
};
