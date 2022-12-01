import { Html, Head, Main, NextScript } from "next/document";

/**
 * 基础html结构
 */
export default function Document() {
  return (
    <Html>
      <Head>
        <title>一片黑暗啊表情包生成器</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
