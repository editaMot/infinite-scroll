import { useCallback, useRef } from "react";

const useIntersectionObserver = <T extends HTMLElement>(
  callback: (entries: IntersectionObserverEntry[]) => void,
  deps: React.DependencyList
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (node) {
        observer.current = new IntersectionObserver((entries) => {
          callback(entries);
        });
        observer.current.observe(node);
      }
    },
    [callback]
  );

  return ref;
};

export default useIntersectionObserver;
