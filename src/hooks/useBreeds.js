import { queryCache, useQuery } from 'react-query';
import { useClient } from './useClient';

const dogQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

const getBreedSearchConfig = (client, query) => ({
  queryKey: ['breedSearch', { query }],
  queryFn: () =>
    client(`breeds/search?q=${encodeURIComponent(query)}`).then((data) => data),
  enabled: !!query,
  config: {
    onSuccess(breeds) {
      for (const breed of breeds) {
        queryCache.setQueryData(
          ['breed', { breedId: breed.id }],
          breed,
          dogQueryConfig,
        );
      }
    },
  },
});

const getBreedConfig = (client) => ({
  queryKey: ['breeds'],
  queryFn: () => client(`breeds?limit=35&page=0`).then((data) => data),
  config: {
    onSuccess(breeds) {
      for (const breed of breeds) {
        queryCache.setQueryData(
          ['dogList', { breedId: breed.id }],
          breed,
          dogQueryConfig,
        );
      }
    },
  },
});

const getDogImageConfig = (client, imageId) => ({
  queryKey: ['breed-image', { imageId }],
  queryFn: () => client(`images/${imageId}`).then((data) => data),
  config: {
    onSuccess(breeds) {
      for (const breed of breeds) {
        queryCache.setQueryData(
          ['dogList', { breedId: breed.id }],
          breed,
          dogQueryConfig,
        );
      }
    },
  },
});

function useBreedSearch(query) {
  const client = useClient();
  let config;
  if (query) {
    config = getBreedSearchConfig(client, query);
  } else {
    config = getBreedConfig(client);
  }
  const result = useQuery(config);
  return { ...result, breeds: result.data ?? '' };
}

function useBreedImage(imageId) {
  const client = useClient();
  const result = useQuery(getDogImageConfig(client, imageId));
  return { ...result, image: result.data ?? '' };
}

function useBreed(breedId) {
  const client = useClient();
  const result = useQuery({
    queryKey: ['breed', { breedId }],
    queryFn: () => client(`breeds/${breedId}`).then((data) => data),
    ...dogQueryConfig,
  });
  return { ...result, breed: result.data ?? '' };
}

export { useBreed, useBreedSearch, useBreedImage };
