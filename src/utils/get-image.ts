export const getImage = (size: string = 'original', path: string) => {
  return `http://image.tmdb.org/t/p/${size}${path}`;
};
