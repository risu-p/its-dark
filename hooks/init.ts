import { SystemStore } from "@/stores/system";
import { useCallback, useLayoutEffect } from "react";

/**
 * 检查是否为移动端设备
 */
export const useIsMobile = (store: {
  setIsMobile: SystemStore["setIsMobile"];
}) => {
  const { setIsMobile } = store;

  const checkIsMobile = useCallback(async () => {
    const { isMobile } = await import("react-device-detect");
    setIsMobile(isMobile);
  }, []);

  /**
   * 初始化时
   */
  useLayoutEffect(() => {
    checkIsMobile();
  }, []);
};
