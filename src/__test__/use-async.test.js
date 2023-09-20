import { renderHook, act } from '@testing-library/react';
import { useAsync } from '../hooks/useAsync';

beforeEach(() => {
  jest.spyOn(console, 'error');
});

afterEach(() => {
  console.error.mockRestore();
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const defaultState = {
  status: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  reset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
};

const pendingState = {
  ...defaultState,
  status: 'pending',
  isIdle: false,
  isLoading: true,
};

const resolvedState = {
  ...defaultState,
  status: 'resolved',
  isIdle: false,
  isSuccess: true,
};

const rejectedState = {
  ...defaultState,
  status: 'rejected',
  isIdle: false,
  isError: true,
};

test('calling run with a promise which resolved', async () => {
  const { promise, resolve } = deferred();
  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);

  let p;
  await act(() => {
    p = result.current.run(promise);
  });

  expect(result.current).toEqual(pendingState); // pending state
  const resolvedValue = Symbol('resolved value');
  await act(async () => {
    resolve(resolvedValue);
    await p;
  });
  expect(result.current).toEqual({
    ...resolvedState,
    data: resolvedValue,
  }); // resolved state

  act(() => {
    result.current.reset();
  });

  expect(result.current).toEqual(defaultState); // reset
});

test('calling run with a promise which rejects', async () => {
  const { promise, reject } = deferred();
  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);
  let p;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(pendingState); // pending state
  const rejectedValue = Symbol('rejected value');
  await act(async () => {
    reject(rejectedValue);
    await p.catch(() => {
      /* ignore erorr */
    });
  });

  expect(result.current).toEqual({ ...rejectedState, error: rejectedValue }); // rejected state

  act(() => {
    result.current.reset();
  });

  expect(result.current).toEqual(defaultState); // reset
});
