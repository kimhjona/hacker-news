const corsProxy = `https://cors-anywhere.herokuapp.com/`;
const isDevMode = process.env.NODE_ENV === "development";

export const getUrl = (url: string) => (isDevMode ? `${corsProxy}${url}` : url);
