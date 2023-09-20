import ArtWorksData from './artworks-data.json';
import { matchSorter } from 'match-sorter';

let artworks = [...ArtWorksData];

async function create(breed) {
  artworks.push(breed);
  return breed;
}

async function read(breedId) {
  return artworks.find((breed) => breed.id === breedId);
}

async function query(search) {
  return matchSorter(artworks, search, {
    keys: ['name', { threshold: matchSorter.rankings.CONTAINS, key: 'name' }],
  });
}

async function reset() {
  artworks = [...ArtWorksData];
}

export { create, read, query, reset };
