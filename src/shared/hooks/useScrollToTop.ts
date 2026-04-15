import { useEffect } from 'react';

export const useScrollToTop = (step: string) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [step]);
};
