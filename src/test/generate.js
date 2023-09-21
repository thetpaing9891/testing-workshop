import * as artWorkDB from './data/artworks';
async function buildArtWork(id = 7122) {
  const data = await artWorkDB.read(id);
  return {
    ...data,
  };
}
export { buildArtWork };
