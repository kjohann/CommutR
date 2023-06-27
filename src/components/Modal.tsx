import {FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PlainButton } from './Buttons';

const Container = styled.dialog<{ width: number}>`
  width: ${props => `${props.width}px`};
  border-radius: 8px;
  border: 1px solid #888;

  ::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
`;

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => Promise<void>;
  canProceed: boolean;
  children: React.ReactNode;
  proceedButtonText?: string;
  closeButtonText?: string;
  width?: number;
}

const isClickInsideRectangle = (e: React.MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

export const Modal: FC<ModalProps> = ({ 
  title,
  isOpen,
  onClose,
  onProceed,
  canProceed,
  children,
  proceedButtonText = 'Lagre',
  closeButtonText = 'Lukk',
  width = 600
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
      document.body.classList.add('modal-open'); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove('modal-open');
    }
  }, [isOpen]);

  return (
    <Container 
      ref={ref}
      width={width}
      onCancel={onClose}
      onClick={(e) => ref.current && !isClickInsideRectangle(e, ref.current) && onClose()}
    >
      <h2>{title}</h2>

      {children}

      <Buttons>
        <PlainButton disabled={!canProceed} onClick={onProceed}>{proceedButtonText}</PlainButton>
        <PlainButton onClick={onClose}>{closeButtonText}</PlainButton>
      </Buttons>
    </Container>
  );
}

