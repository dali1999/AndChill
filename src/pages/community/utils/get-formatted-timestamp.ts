export const getFormattedTimeStamp = (createdAt: string) => {
  return new Date(createdAt)
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/(\d{4})\/(\d{1,2})\/(\d{1,2})/, '$1.$2.$3')
    .replace(',', ' ')
    .replace(/(\d{2}):(\d{2})/, ' $1:$2');
};
