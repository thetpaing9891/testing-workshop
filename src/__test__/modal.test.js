import * as React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { Modal } from '../components/modal';
import userEvent from '@testing-library/user-event';

test('can be opened and closed', async () => {
  const title = 'Login';
  render(
    <Modal title={title}>
      <div>Content</div>
    </Modal>,
  );

  await act(() => userEvent.click(screen.getByRole('button', { name: title })));
  const modal = screen.getByRole('dialog');
  expect(modal).toHaveAttribute('aria-label', title);

  const inModal = within(screen.getByRole('dialog'));
  expect(inModal.getByRole('heading', { name: title })).toBeInTheDocument();

  await act(() =>
    userEvent.click(inModal.getByRole('button', { name: /close modal/i })),
  );
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
