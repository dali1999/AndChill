export const SORT_INFO: TSortItem[] = [
  { title: '인기순', queryStr: 'popularity.desc' },
  { title: '흥행순', queryStr: 'revenue.desc' },
  { title: '최신순', queryStr: 'primary_release_date.desc' },
  { title: '오래된 순', queryStr: 'primary_release_date.asc' },
  { title: '평점 높은 순', queryStr: 'vote_average.desc' },
] as const;

export interface TSortItem {
  title: string;
  queryStr: string;
}
