export function calculateGroups(totalItems: number, groupSize: number) {
  const fullGroups = Math.floor(totalItems / groupSize);
  const remainder = totalItems % groupSize;
  return remainder > 0 ? fullGroups + 1 : fullGroups;
}
