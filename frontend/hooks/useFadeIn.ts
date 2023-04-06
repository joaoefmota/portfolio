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

{
  /*

import { useState, useEffect, useRef } from "react";

const useFadeIn = (threshold = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const component = componentRef.current;

    if (component) {
      const handleScroll = () => {
        if (
          window.scrollY + window.innerHeight >
          component.getBoundingClientRect().top // returns the size of the component and its position relative to the viewport
        ) {
          setIsVisible(true);
          component.style.visibility = "visible"; // Set visibility to visible
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [componentRef, threshold]);

  return { componentRef, isVisible };
};

export default useFadeIn;

*/
}
