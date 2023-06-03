import { useRef, useCallback } from "react";

function useInfiniteScroll(isLoading, hasMorePage, setPage) {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePage) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMorePage, setPage]
  );

  return lastElementRef;
}

export default useInfiniteScroll;
