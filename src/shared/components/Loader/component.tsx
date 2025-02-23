import { ClipLoader } from 'react-spinners';

export const Loader = () => (
  <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 210px)' }}>
    <ClipLoader color="#ff5722" size={64} />
  </div>
);
