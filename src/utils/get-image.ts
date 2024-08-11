export const getImage = (size: string = 'original', path: string | undefined) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
