const countryLanguageMap: Record<string, string[]> = {
  KR: ['ko'], // 한국어
  US: ['en'], // 영어
  CN: ['zh'], // 중국어
  AE: ['ar'], // 아랍어
  FR: ['fr'], // 프랑스어
  DE: ['de'], // 독일어
  ES: ['es'], // 스페인어
  JP: ['ja'], // 일본어
  RU: ['ru'], // 러시아어
  PT: ['pt'], // 포르투갈어
  VN: ['vi'], // 베트남어
  IT: ['it'], // 이탈리아어
  TH: ['th'], // 태국어
  ID: ['id'], // 인도네시아어
};

export const getLanguageByCountry = (countryCode: string, lang: string): string => {
  if (!countryLanguageMap[countryCode]) {
    return 'en';
  } else {
    return countryLanguageMap[countryCode][0] || lang;
  }
};
