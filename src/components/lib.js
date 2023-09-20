/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
import { FaSpinner } from 'react-icons/fa';
import { Dialog as ReachDialog } from '@reach/dialog';

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

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '',
  color: '33333',
  border: `1px solid #cccccc`,
  cursor: 'pointer',
});

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
});

const replaceImage = (error) => {
  error.target.src =
    'https://upload.wikimedia.org/wikipedia/commons/3/32/Art_Institute_of_Chicago_logo.svg';
};

export {
  Spinner,
  FullPageSpinner,
  Dialog,
  Input,
  Link,
  CircleButton,
  replaceImage,
};
