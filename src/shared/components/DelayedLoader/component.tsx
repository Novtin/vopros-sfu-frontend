import { useState, useEffect } from 'react';
import { Loader } from '../Loader';

export const DelayedLoader = ({ delay = 500, children }: { delay?: number; children: React.ReactNode }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showContent ? <>{children}</> : <Loader />;
};
