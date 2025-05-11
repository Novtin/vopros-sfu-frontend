import { ModalProps } from './component.props';

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-base-grey-01 p-6 rounded-lg shadow-md max-w-lg w-full">{children}</div>
    </div>
  );
};
