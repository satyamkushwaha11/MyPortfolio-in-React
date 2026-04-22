import { useEffect, useRef, useState } from "react";

export const useReveal = (options = {}) => {
  const { threshold = 0.15, once = true, rootMargin = "0px 0px -60px 0px" } =
    options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, visible];
};

export default useReveal;
