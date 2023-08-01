import { useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  children: JSX.Element | JSX.Element[];
  isScrolling: boolean;
  isLoading: boolean;
  isInfinite: boolean;
  callback: () => unknown;
};

function InfiniteScroll({
  children,
  isScrolling,
  isLoading,
  isInfinite,
  callback,
}: InfiniteScrollProps) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (isScrolling && !isInfinite) {
            callback();
          }
        }
      },
      { threshold: 1 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, isScrolling, isInfinite, callback]);

  return (
    <>
      {children}
      <span ref={observerTarget}></span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {isLoading && isScrolling && <p>Loading...</p>}
        {isInfinite && !isLoading && (
          <button
            onClick={callback}
            style={{ cursor: 'pointer', padding: '12px' }}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
}

export default InfiniteScroll;
