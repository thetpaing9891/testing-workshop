/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import { jsx } from '@emotion/core';

import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

Spinner.defaultProps = {
  'aria-label': 'loading',
};

const inputStyles = {
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
};

const Input = styled.input({ borderRadius: '3px' }, inputStyles);

function FullPageSpinner() {
  return (
    <div
      style={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Spinner />
    </div>
  );
}

export { Spinner, FullPageSpinner, Input, Link };
