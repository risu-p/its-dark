import logo from "@/public/images/logo.png";

import React, { FC, memo, useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";

type IProps = {};

/**
 * 顶部导航栏
 */
const Navigator: FC<IProps> = memo(({}) => {
  return (
    <div className={styles.wrap}>
      {/* logo */}
      <div className={styles.logo}>
        <img src={logo.src} className={styles.logoImg} />
        <div className={styles.logoText}>关于我们</div>
      </div>
    </div>
  );
});

export default Navigator;
