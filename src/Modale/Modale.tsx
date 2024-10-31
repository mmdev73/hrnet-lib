import React, { useEffect, useRef, ReactNode } from "react";
import Cross from "../assets/cross.png";
import './Modale.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  id?: string;
}

/**
 * A modal dialog component that can display a header, body and footer.
 * When the `isOpen` prop is `true`, the dialog is shown. When the user clicks outside the dialog
 * or presses the escape key, the `onClose` callback is called.
 * Props:
 * - isOpen (boolean): Whether the dialog is open or not. It is required.
 * - onClose (function): Callback function to be called when the dialog is closed. It is required.
 * - children (ReactNode): The content of the dialog. It is required.
 * - header (ReactNode, optional): The header content of the dialog. By default is set to null.
 * - footer (ReactNode, optional): The footer content of the dialog. By default is set to null.
 * - id (string, optional): The ID of the dialog. By default is set to "hrnet-modal".
 */
const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  header = null, 
  footer = null, 
  id = "hrnet-modal" }: ModalProps) => {
    
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <>
      <dialog ref={dialogRef} className="hrn-modal" id={id}>
        <button onClick={onClose} className="hrn-modal__close-button">
          <img src={Cross} alt="Close button" className="hrn-modal__close-button--icon" />
        </button>
        {header && <div className="hrn-modal__header">{header}</div>}
        <div className="hrn-modal__body">{children}</div>
        {footer && <div className="hrn-modal__footer">{footer}</div>}
      </dialog>
    </>
  );
};

export default Modal;
