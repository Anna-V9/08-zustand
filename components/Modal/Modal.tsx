'use client';

import { useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css"

interface ModalProps{
    children: React.ReactNode;
    onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  }
  

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}>
      <div className={css.modal}>
          {children}
      </div>
    </div>, document.body
  );
}

export default Modal;