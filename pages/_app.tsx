import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useIsMobile, useVConsole } from "@/hooks/init";
import { observer } from "mobx-react";
import { systemStore } from "@/stores/system";
import { useEffect, useLayoutEffect } from "react";

function App({ Component, pageProps }: AppProps) {
  const { setIsMobile } = systemStore;

  useVConsole();

  /* 检查设备 */
  useIsMobile({ setIsMobile });

  return <Component {...pageProps} />;
}

export default observer(App);
