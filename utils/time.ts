import dayjs from "dayjs";

export enum HistoryRange {
  Week,
  Month,
  Year,
}

export const generateYearsUntilToday = (startYear: number) => {
  let currentDate = new Date(startYear, 1, 1);
  const years = [];
  do {
    years.push(currentDate.getFullYear());
    currentDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
  } while (currentDate.getFullYear() <= new Date().getFullYear());

  return years;
};

export const getHistoryRangeTimestamps = (historyRange: HistoryRange) => {
  const endTimestamp = dayjs().unix();
  let startTimestamp = 0;

  switch (historyRange) {
    case HistoryRange.Week:
      startTimestamp = dayjs().subtract(7, "day").unix();
      break;
    case HistoryRange.Month:
      startTimestamp = dayjs().subtract(1, "month").unix();
      break;
    default:
      startTimestamp = dayjs().subtract(1, "year").unix();
      break;
  }

  return { startTimestamp, endTimestamp };
};
