import { ApolloError } from '@apollo/client';
import React, { createContext } from 'react';
import { useGetAudioList } from '../hooks/useGetAudioList';
import { Sound } from './types';

export const SoundProviderContext = createContext<{
  loading: boolean;
  error: ApolloError | undefined;
  data: Sound[];
}>({
  loading: true,
  error: new ApolloError({}),
  data: [
    {
      title: '',
      id: '',
      url: '',
      playing: false,
    },
  ],
});

const SoundProvider = ({ children }: JSX.ElementChildrenAttribute) => {
  const { loading, error, data } = useGetAudioList();

  return (
    <SoundProviderContext.Provider value={{ loading, error, data }}>
      {children}
    </SoundProviderContext.Provider>
  );
};

export default SoundProvider;
