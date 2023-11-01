import { useRef, useCallback } from "react";

function useInfiniteScroll(hasMorePage, setPage) {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePage) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMorePage, setPage]
  );

  return lastElementRef;
}

export default useInfiniteScroll;
