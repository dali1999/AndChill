export const calculateLeftDays = (releaseDateStr: string): number => {
  const releaseDate = new Date(releaseDateStr);
  const currentDate = new Date();
  const timeDifference = releaseDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft;
};
