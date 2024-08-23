export const SORT_INFO: TSortItem[] = [
  { title: 'popularity', queryStr: 'popularity.desc' },
  { title: 'revenue', queryStr: 'revenue.desc' },
  { title: 'latest', queryStr: 'primary_release_date.desc' },
  { title: 'oldest', queryStr: 'primary_release_date.asc' },
  { title: 'rate', queryStr: 'vote_average.desc' },
] as const;

export interface TSortItem {
  title: string;
  queryStr: string;
}
