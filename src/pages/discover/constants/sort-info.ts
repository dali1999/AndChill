export const SORT_INFO: TSortItem[] = [
  { title: '인기순', queryStr: 'popularity.desc' },
  { title: '이름순', queryStr: 'title.desc' },
  { title: '흥행순', queryStr: 'revenue.desc' },
  { title: '개봉 일자순', queryStr: 'primary_release_date.desc' },
  { title: '평점순', queryStr: 'vote_average.desc' },
] as const;

export interface TSortItem {
  title: string;
  queryStr: string;
}
