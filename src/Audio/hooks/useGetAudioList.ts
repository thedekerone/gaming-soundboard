import { ApolloError, gql, useQuery } from '@apollo/client';
import { Sound } from '../components/types';

const EXCHANGE_RATES = gql`
  query getSounds {
    allSounds {
      file {
        publicUrl
      }
      title
      id
    }
  }
`;

export const useGetAudioList: () => {
  loading: boolean;
  error: ApolloError | undefined;
  data: Sound[];
} = () => {
  const response = useQuery(EXCHANGE_RATES);
  const { loading, error } = response;
  const { data } = response;
  if (loading || error) return { loading, error, data };

  const formatedData: Sound[] = data.allSounds.map((el: any) => ({
    title: el.title,
    url: el.file.publicUrl,
    id: el.id,
    playing: false,
  }));

  return { loading, error, data: formatedData };
};

export const not = () => {};
