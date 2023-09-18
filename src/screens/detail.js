import React from 'react';
import { useParams } from 'react-router-dom';
import { useBreed, useBreedImage } from '../hooks/useBreeds';
import { FullPageSpinner } from '../components/lib';
function DogDetailScreen() {
  const { breedId } = useParams();
  const { breed } = useBreed(breedId);

  const {
    name,
    bred_for,
    height,
    weight,
    breed_group,
    life_span,
    temperament,
    reference_image_id,
  } = breed;
  const { image, isLoading } = useBreedImage(reference_image_id);
  const { url } = image;

  return (
    <div className=" max-w-lg m-auto">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <FullPageSpinner />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <h2 className=" text-3xl text-center">{name || ''}</h2>
          <div className="flex justify-center items-center">
            <img
              src={url}
              className=" max-h-[400px] object-cover border rounded-lg"
            />
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2">
              <label className=" text-gray-400">Bread For</label>
              <div>- {bred_for || ''}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-gray-400">Height</label>
              <div>- {height && height.metric} cm</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-gray-400">Weight</label>
              <div>- {weight && weight.metric} cm</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-gray-400">Breed Group</label>
              <div>- {breed_group || ''}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-gray-400">Life Span</label>
              <div>- {life_span || ''}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-gray-400">Temperament</label>
              <div>{temperament || ''}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default DogDetailScreen;
