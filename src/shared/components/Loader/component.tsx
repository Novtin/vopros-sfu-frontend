import { PageLayout } from '@/app/pages/PageLayout';
import { ClipLoader } from 'react-spinners';

export const Loader = () => (
  <PageLayout className="my-4 mx-6 flex items-center justify-center h-screen bg-base-grey-01">
    <ClipLoader color="#ff5722" size={50} />
  </PageLayout>
);
