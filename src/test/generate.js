import faker from 'faker';

function buildArtWork(overrides) {
  return {
    id: faker.datatype.number(5),
    title: faker.lorem.words(),
    date_start: 1600,
    date_end: 1610,
    date_display: faker.lorem.words(),
    artist_display: faker.lorem.words(),
    artist_title: faker.lorem.words(),
    place_of_origin: faker.lorem.words(),
    credit_line: faker.lorem.words(),
    material_titles: [
      'paper (fiber product)',
      'ink',
      'coating (material)',
      'iron gall ink',
    ],
    image_id: '9484feef-7c7f-e70f-4d5e-4320ece4bfd1',
    ...overrides,
  };
}

export { buildArtWork };
