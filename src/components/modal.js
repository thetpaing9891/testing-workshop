/* eslint-disable react/prop-types */
import * as React from 'react';
import { createPortal } from 'react-dom';

function Dialog({ onClose, title, children, ...props }) {
  return (
    <div className="modal px-4" tabIndex="-1" role="dialog" aria-label={title}>
      <div
        className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-4"
        {...props}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-semibold uppercase">{title}</h1>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="staticModal">
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
}

function Modal({ title, ...props }) {
  const [showModal, setShowModal] = React.useState(false);

  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  React.useEffect(() => {
    if (!showModal) document.body.style.overflow = 'unset';
    else document.body.style.overflow = 'hidden';
  }, [showModal]);

  return (
    <div>
      <button className="text-[#b50938]" onClick={open}>
        {title}
      </button>
      {showModal &&
        createPortal(
          <Dialog onClose={close} {...props} title={title} />,
          document.body,
        )}
    </div>
  );
}

export { Modal };
