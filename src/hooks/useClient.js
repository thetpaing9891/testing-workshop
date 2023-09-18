import * as React from 'react';
import { client } from '../utils/api-client';

function useClient() {
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config }),
    [],
  );
}

export { useClient };
