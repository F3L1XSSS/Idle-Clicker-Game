import { useState, useEffect } from 'react';

const Modal = ({ isShowing, toggle, children }) => {
  const [shouldRender, setShouldRender] = useState(isShowing);

  useEffect(() => {
    if (isShowing) {
      setShouldRender(true);
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      setTimeout(() => {
        setShouldRender(false);
      }, 350);
    }
  }, [isShowing]);

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isShowing) {
        toggle();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isShowing, toggle]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      style={{
        zIndex: 100,
      }}
      className={`fixed top-0 left-0 h-full w-full z-100 bg-opacity-35 bg-blue-800 backdrop-filter backdrop-blur-xs`}
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  );
};

export default Modal;
