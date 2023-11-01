export const getLocaleDateISOString = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() / 60;
  date.setHours(date.getHours() - offset);

  const ISOString = date.toISOString();
  console.log('[getLocaleDateISOString] current date: ' + ISOString);
  return ISOString;
};

export const getInitialDateISOString = () => {
  const date = new Date(getLocaleDateISOString());
  date.setHours(0, 0, 0, 0);
  const ISOString = date.toISOString();
  console.log("[getLocaleDateISOString] today's date at midnight: " + ISOString);
  return ISOString;
};

export const getRandomID = (): string => {
    return window.crypto.randomUUID()
}