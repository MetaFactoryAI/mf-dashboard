import { useState, useEffect, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useResize = (ref: any, ratio: number) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = useCallback(() => {
    if (ref) {
      const currentWidth = ref.current.offsetWidth;

      setWidth(currentWidth);
      setHeight(currentWidth * ratio);
    }
  }, [ratio, ref]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return { width, height };
};

export default useResize;
