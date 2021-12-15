import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useResize = (ref: any, ratio: number) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref) {
        const currentWidth = ref.current.offsetWidth;

        setWidth(currentWidth);
        setHeight(currentWidth * ratio);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ratio, ref]);

  return { width, height };
};

export default useResize;
