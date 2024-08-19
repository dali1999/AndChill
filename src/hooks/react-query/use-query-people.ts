import peopleRequest from '@api/people/people-request';
import { TPeopleCreditsFetchRes, TPeopleDetailsFetchRes, TPeopleImagesFetchRes } from '@api/people/people-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const usePeopleDetailsQuery = (peopleId: number, language: string) => {
  const query = useQuery<TPeopleDetailsFetchRes, Error>({
    queryKey: [QUERY_KEY.peopleDetails, peopleId, language],
    queryFn: async () => await peopleRequest.fetchPeopleDetails(peopleId, language),
  });
  return query;
};

export const usePeopleImagesQuery = (peopleId: number) => {
  const query = useQuery<TPeopleImagesFetchRes, Error>({
    queryKey: [QUERY_KEY.peopleImages, peopleId],
    queryFn: async () => await peopleRequest.fetchPeopleImages(peopleId),
  });
  return query;
};

export const usePeopleCreditsQuery = (peopleId: number, language: string) => {
  const query = useQuery<TPeopleCreditsFetchRes, Error>({
    queryKey: [QUERY_KEY.peopleCredits, peopleId, language],
    queryFn: async () => await peopleRequest.fetchPeopleCredits(peopleId, language),
  });
  return query;
};
