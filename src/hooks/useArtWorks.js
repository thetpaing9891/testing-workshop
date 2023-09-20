import { queryCache, useQuery } from 'react-query';
import { useClient } from './useClient';

const artWorkQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

const fieldsParam =
  'fields=artist_title,style_titles,material_titles,place_of_origin,date_start,date_end,material_titles,image_id,thumbnail,title,id,dimensions,credit_line,artist_display,date_display';

const params = `page=1&limit=30&${fieldsParam}`;

const getArtWorkConfig = (client) => ({
  queryKey: ['artworks'],
  queryFn: () =>
    client(`v1/artworks?${params}`).then((data) => {
      return data.data;
    }),
  config: {
    onSuccess(artworks) {
      for (const artwork of artworks) {
        queryCache.setQueryData(
          ['artworksList', { breedId: artwork.id }],
          artwork,
          artWorkQueryConfig,
        );
      }
    },
  },
});

function useGetArtWorks() {
  const client = useClient();
  let config;
  config = getArtWorkConfig(client);
  const result = useQuery(config);
  return { ...result, artworks: result.data ?? '' };
}

function useArtWork(artWorkId) {
  const client = useClient();
  const result = useQuery({
    queryKey: ['artwork', { artWorkId }],
    queryFn: () =>
      client(`v1/artworks/${artWorkId}?${fieldsParam}`).then(
        (data) => data.data,
      ),
    ...artWorkQueryConfig,
  });
  return { ...result, artwork: result.data ?? '' };
}

export { useArtWork, useGetArtWorks };
