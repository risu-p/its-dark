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

/**
 * 启动vconsole
 */
export const useVConsole = () => {
  useLayoutEffect(() => {
    if (window.location.href.toLowerCase().indexOf("istest") !== -1) {
      // vconsole只能在客户端引入，在服务端连import都不行
      import("vconsole").then((res) => {
        const VConsole = res?.default;
        if (VConsole) {
          const vConsole = new VConsole();
        }
      });
    }
  }, []);
};
