import { useEffect, useState } from 'react';
const usePageWidth = () => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newPageWidth = window.innerWidth;
      if (newPageWidth !== pageWidth) setPageWidth(newPageWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return pageWidth;
};

export default usePageWidth;
