import { useState, useEffect, useRef } from "react";

const useFadeIn = (threshold = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const component = componentRef.current;

    if (component) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );

      observer.observe(component);
      return () => {
        if (observer) observer.disconnect();
      };
    }
  }, [componentRef, threshold]);

  return { componentRef, isVisible };
};

export default useFadeIn;
