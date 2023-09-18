import * as React from 'react';
import { Spinner, Input, FullPageSpinner } from '../components/lib';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { BreedRow } from '../components/breed-row';
import { useBreedSearch } from '../hooks/useBreeds';

function DogListScreen() {
  const [query, setQuery] = React.useState('');
  const { breeds, isError, error, isLoading } = useBreedSearch(query);

  const handleSearchClick = (event) => {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
  };

  return (
    <div>
      <div className="w-full md:w-1/2 m-auto flex justify-center items-center">
        <form onSubmit={handleSearchClick} className="w-full">
          <Input
            placeholder="Search the breed..."
            id="search"
            type="search"
            css={{ width: '100%' }}
            className="w-full"
          />
          <button
            type="submit"
            style={{
              border: '0',
              position: 'relative',
              marginLeft: '-35px',
              background: 'transparent',
            }}>
            {isLoading ? (
              <Spinner />
            ) : isError ? (
              <FaTimes aria-label="error" className=" text-danger" />
            ) : (
              <FaSearch aria-label="search" />
            )}
          </button>
        </form>
      </div>

      {isError ? (
        <div className="text-danger py-4">
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {breeds.length ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 py-4">
          {breeds.map((breed, i) => (
            <BreedRow breed={breed} key={i} />
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
export default DogListScreen;
