export const getImage = (size: string = 'original', path: string | undefined) => {
  return `http://image.tmdb.org/t/p/${size}${path}`;
};
