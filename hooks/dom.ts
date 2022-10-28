import { useLayoutEffect, useRef } from "react";

/**
 * 页面初始化，设置html bgColor
 */
export const useHtmlBgColorInit = (color: string) => {
  const prevBgColor = useRef<string>("");

  useLayoutEffect(() => {
    prevBgColor.current = document.documentElement.style.backgroundColor || "";
    document.documentElement.style.backgroundColor = color;

    return () => {
      document.documentElement.style.backgroundColor = prevBgColor.current;
    };
  }, []);
};
