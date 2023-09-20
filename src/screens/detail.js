import React from 'react';
import { useParams } from 'react-router-dom';
import { useArtWork } from '../hooks/useArtWorks';
import { FullPageSpinner, replaceImage } from '../components/lib';

function DetailScreen() {
  const { artWorkId } = useParams();
  const { artwork, isLoading } = useArtWork(artWorkId);

  const {
    credit_line,
    title,
    artist_display,
    dimensions,
    date_display,
    material_titles,
    place_of_origin,
    image_id,
  } = artwork;

  return (
    <div className="m-auto py-4">
      {isLoading ? (
        <FullPageSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 border p-2 md:p-5 rounded-lg">
          <div>
            <div className="flex justify-center items-center">
              <img
                src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
                alt={title}
                onError={replaceImage}
                className="object-cover border rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-3xl font-bold">{title || ''}</h2>
            <h3 className=" text-2xl">{artist_display}</h3>
            <p>{place_of_origin}</p>
            <p>{date_display}</p>
            <p>{dimensions}</p>
            <p>{material_titles}</p>
            <p>{credit_line}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default DetailScreen;
