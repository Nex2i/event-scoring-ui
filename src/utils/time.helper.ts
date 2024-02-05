const defaultLocalOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export const convertEpochToDate = (epochTime: string | number): Date => {
  const date = new Date(Number(epochTime) * 1000);
  return date;
};

export const convertEpochToDateFormat = (
  date: string | number,
  options: Intl.DateTimeFormatOptions = defaultLocalOptions
): string => {
  return convertEpochToDate(date).toLocaleDateString('en-us', options);
};
