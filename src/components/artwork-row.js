/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { replaceImage } from './lib';

function ArtWorkRow({ artwork }) {
  const {
    id,
    title,
    artist_title,
    date_start,
    date_end,
    material_titles,
    place_of_origin,
    image_id,
  } = artwork;

  const imageUrl = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;

  return (
    <div className="w-full">
      <Link
        to={`/detail/${id}`}
        className="flex flex-col gap-y-1 border rounded-lg p-3 min-h-full">
        <img
          src={imageUrl}
          alt={title}
          onError={replaceImage}
          className="h-32 max-h-32 md:h-[220px] md:max-h-[250px] object-cover"
        />
        <h2 className="name capitalize text-lg">{title || ''}</h2>
        <p className=" text-neutral-600 text-sm uppercase">
          {artist_title || ''}
        </p>
        <p className="text-sm">
          {place_of_origin}({date_start || ''} - {date_end || ''})
        </p>
        <p className="text-sm">{material_titles || ''}</p>
      </Link>
    </div>
  );
}
export { ArtWorkRow };
