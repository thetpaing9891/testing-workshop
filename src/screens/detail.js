import React from 'react';
import { useParams } from 'react-router-dom';
import { useArtWork } from '../hooks/useArtWorks';
import { FullPageSpinner, replaceImage } from '../components/lib';

function DetailScreen() {
  const { artWorkId } = useParams();
  const [addFavourite, setFavourite] = React.useState(false);
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
            <div>
              {addFavourite ? (
                <button
                  onClick={() => setFavourite(false)}
                  className="bg-[#b50938] hover:bg-opacity-70 text-white py-2 px-4 rounded-lg">
                  Remove Favorites
                </button>
              ) : (
                <button
                  onClick={() => setFavourite(true)}
                  className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg">
                  Add to Favorites
                </button>
              )}
            </div>
            <h2 className="text-3xl font-bold" role="heading">
              {title || ''}
            </h2>
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
