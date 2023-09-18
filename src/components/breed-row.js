/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useBreedImage } from '../hooks/useBreeds';
import { Spinner } from './lib';

function BreedRow({ breed }) {
  const { id, name, bred_for, height, life_span, reference_image_id } = breed;
  const { image, isLoading } = useBreedImage(reference_image_id);
  const { url } = image;
  return (
    <div className="w-full">
      <Link
        to={`/detail/${id}`}
        className="flex flex-col gap-y-1 border rounded-lg p-3 min-h-full">
        {isLoading ? (
          <div className="w-full flex justify-center items-center min-h-[120px]">
            <Spinner />
          </div>
        ) : (
          <img
            src={url || ''}
            alt={name}
            className="h-32 max-h-32 md:h-[220px] md:max-h-[250px] object-cover"
          />
        )}
        <h2 className="name capitalize text-lg">{name || ''}</h2>
        <p className=" text-neutral-600 text-sm uppercase">{bred_for || ''}</p>
        <p className="text-sm">{height.imperial || ''}</p>
        <p className="text-sm">{life_span || ''}</p>
      </Link>
    </div>
  );
}
export { BreedRow };
