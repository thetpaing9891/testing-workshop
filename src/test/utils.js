import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { AppProviders } from '../context';

async function render(ui, { route = '/', ...renderOption }) {
  window.history.pushState({}, 'Testing Page', route);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProviders,
      ...renderOption,
    }),
  };
  return returnValue;
}
const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

export * from '@testing-library/react';
export { render, waitForLoadingToFinish };
