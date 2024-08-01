export function getFlagEmoji(regionCode: string) {
  const regionPoints = regionCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...regionPoints);
}
