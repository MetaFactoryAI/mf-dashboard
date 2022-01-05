// eslint-disable-next-line import/prefer-default-export
export const generateYearsUntilToday = (startYear: number) => {
  let currentDate = new Date(startYear, 1, 1);
  const years = [];
  do {
    years.push(currentDate.getFullYear());
    currentDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
  } while (currentDate.getFullYear() <= new Date().getFullYear());

  return years;
};
