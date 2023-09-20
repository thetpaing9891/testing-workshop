import { render as rtlRender } from '@testing-library/react';
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

export * from '@testing-library/react';
export { render };
