export const getDate = () => {
  const date = buildLocalDateFromCurrentUTC().split('T')[0];
  console.log("[getDate] today's date in YYYY-MM-DD: " + date);
  return date;
};

export const dateToNumber = (date: string): number => {
  return Number(date.split('-').join(''));
}

export const getRandomID = (): string => {
    return window.crypto.randomUUID()
}

export const buildLocalDateFromCurrentUTC = () => {
  const currentUTCDate = new Date();
  const userOffsetMinutes = currentUTCDate.getTimezoneOffset();
  const utcWithUserOffset = new Date(currentUTCDate.getTime() - (userOffsetMinutes * 60 * 1000));

  return utcWithUserOffset.toISOString();
}