import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

const modalRoot = document.getElementById('modal-root')!;

const createElement = () => {
  const div = document.createElement('div');
  div.className = 'Modal';
  return div;
};

const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const elementRef = useRef(createElement());

  useEffect(() => {
    const element = elementRef.current;
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  return createPortal(children, elementRef.current);
};

export default Modal;
