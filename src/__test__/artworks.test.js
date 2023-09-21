import * as React from 'react';
import { render, screen, act, waitForLoadingToFinish } from '../test/utils';
import * as artworkDB from '../test/data/artworks';
import { App } from '../App';
import { buildArtWork } from '../test/generate';
import userEvent from '@testing-library/user-event';

async function renderArtworkScreen({ artwork } = {}) {
  if (artwork === undefined) {
    artwork = await artworkDB.create(buildArtWork(9505));
  }
  const route = `/detail/${artwork.id}`;
  const utils = await render(<App />, { route });
  return {
    ...utils,
    artwork,
  };
}

test('renders the artwork collection', async () => {
  const { artwork } = await renderArtworkScreen();
  // waiting for loading state
  await waitForLoadingToFinish();
  const heading = screen.getByRole('heading', { name: artwork.title });
  // test detail
  expect(heading).toBeInTheDocument();
  expect(screen.getByText(artwork.place_of_origin)).toBeInTheDocument();
  expect(screen.getByText(artwork.date_display)).toBeInTheDocument();
  expect(screen.getByText(artwork.dimensions)).toBeInTheDocument();
  expect(screen.getByText(artwork.credit_line)).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /add to favorites/i }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: /remove favorites/i }),
  ).not.toBeInTheDocument();
});

test('add and remove favorites the artwork collection', async () => {
  await renderArtworkScreen();

  const addFavouriteButton = screen.getByRole('button', {
    name: /add to favorites/i,
  });
  // add favourite button action
  await act(async () => await userEvent.click(addFavouriteButton));

  const removeFavouriteButton = screen.getByRole('button', {
    name: /remove favorites/i,
  });
  expect(removeFavouriteButton).toBeInTheDocument();

  // remove favourite button action
  await act(async () => await userEvent.click(removeFavouriteButton));
  expect(addFavouriteButton).toBeInTheDocument();
});
