import { Html, Head, Main, NextScript } from "next/document";

/**
 * 基础html结构
 */
export default function Document() {
  return (
    <Html>
      <Head>
        <title>一片黑暗啊</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
