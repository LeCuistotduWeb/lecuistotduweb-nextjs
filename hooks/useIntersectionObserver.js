import { useEffect, useRef } from "react";

export default function useIntersectionObserver(callback, options) {
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
    
    return () => {
      observer.unobserve(target);
    };
  }, [callback, options]);

  return targetRef;
}