import * as React from 'react';
import { FullPageSpinner } from '../components/lib';
import { ArtWorkRow } from '../components/artwork-row';
import { useGetArtWorks } from '../hooks/useArtWorks';

function ArtWorksScreen() {
  const { artworks, isError, error, isLoading } = useGetArtWorks();
  return (
    <div>
      <div className="w-full md:w-1/2 m-auto flex justify-center items-center"></div>

      {isError ? (
        <div className="text-danger py-4">
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {artworks.length ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 py-4">
          {artworks.map((artwork, i) => (
            <ArtWorkRow artwork={artwork} key={i} />
          ))}
        </div>
      ) : (
        isLoading && (
          <div className="w-full m-auto flex justify-center items-center min-h-[200px]">
            <FullPageSpinner />
          </div>
        )
      )}
    </div>
  );
}
export default ArtWorksScreen;
